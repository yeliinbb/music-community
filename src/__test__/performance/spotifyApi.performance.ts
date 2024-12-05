import { spotifyFetcher } from '@/lib/api/spotifyFetcher';
import getPlaylistIdList from '@/lib/utils/getPlaylistIdList';
import { SpotifyPlaylistTracks, SpotifyTrack } from '@/types/spotify.type';

// 성능 측정을 위한 유틸리티 함수
const measureTime = async (fn: () => Promise<any>, label: string) => {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(`\n=== ${label} ===`);
  console.log(`Duration: ${duration.toFixed(2)}ms`);
  console.log(`Duration in seconds: ${(duration / 1000).toFixed(2)}s`);

  return { result, duration };
};

// 병렬 처리 함수 (Promise.all 사용)
async function fetchPlaylistsParallel() {
  const playlistsIds = await getPlaylistIdList();

  const playlistsWithTracks = await Promise.all(
    playlistsIds.map(async (playlistId) => {
      try {
        console.log(`Fetching playlist ${playlistId} in parallel`);
        const [playlistResponse, tracksResponse] = await Promise.all([
          spotifyFetcher(`/playlists/${playlistId}`, {
            method: 'GET',
            next: { revalidate: 3600 },
          }),
          spotifyFetcher(`/playlists/${playlistId}/tracks`, {
            method: 'GET',
            params: {
              fields:
                'items(track(id,name,preview_url,external_urls,duration_ms,artists(id,name),album(id,name,images)))',
              limit: 8,
            },
            next: { revalidate: 3600 },
          }),
        ]);

        return processPlaylistResponse(playlistResponse, tracksResponse);
      } catch (error) {
        console.error(`Error fetching playlist ${playlistId}:`, error);
        return null;
      }
    }),
  );

  return playlistsWithTracks.filter((playlist): playlist is SpotifyPlaylistTracks => playlist !== null);
}

// 순차 처리 함수
async function fetchPlaylistsSequential() {
  const playlistsIds = await getPlaylistIdList();
  const results = [];

  for (const playlistId of playlistsIds) {
    try {
      console.log(`Fetching playlist ${playlistId} sequentially`);
      const playlistResponse = await spotifyFetcher(`/playlists/${playlistId}`, {
        method: 'GET',
        next: { revalidate: 3600 },
      });

      const tracksResponse = await spotifyFetcher(`/playlists/${playlistId}/tracks`, {
        method: 'GET',
        params: {
          fields: 'items(track(id,name,preview_url,external_urls,duration_ms,artists(id,name),album(id,name,images)))',
          limit: 8,
        },
        next: { revalidate: 3600 },
      });

      const processed = processPlaylistResponse(playlistResponse, tracksResponse);
      if (processed) results.push(processed);
    } catch (error) {
      console.error(`Error fetching playlist ${playlistId}:`, error);
    }
  }

  return results;
}

// 응답 처리 헬퍼 함수
function processPlaylistResponse(playlistResponse: any, tracksResponse: any): SpotifyPlaylistTracks | null {
  try {
    return {
      id: playlistResponse.id,
      name: playlistResponse.name,
      external_urls: {
        spotify: playlistResponse.external_urls.spotify,
      },
      tracks: (tracksResponse.items as { track: SpotifyTrack }[]).map((item) => ({
        ...item.track,
        preview_url: item.track.preview_url ?? null,
        external_urls: {
          spotify: item.track.external_urls.spotify,
        },
      })),
    };
  } catch (error) {
    console.error('Error processing playlist response:', error);
    return null;
  }
}

// 성능 테스트 실행 함수
export async function runPerformanceTest(iterations = 3) {
  console.log(`\nStarting performance test with ${iterations} iterations...`);

  const parallelResults = [];
  const sequentialResults = [];

  for (let i = 1; i <= iterations; i++) {
    console.log(`\n=== Iteration ${i}/${iterations} ===`);

    const { duration: parallelDuration } = await measureTime(fetchPlaylistsParallel, `Parallel execution #${i}`);
    parallelResults.push(parallelDuration);

    // 각 반복 사이에 잠시 대기하여 API 레이트 리밋 방지
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { duration: sequentialDuration } = await measureTime(fetchPlaylistsSequential, `Sequential execution #${i}`);
    sequentialResults.push(sequentialDuration);

    // 다음 반복 전 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // 결과 통계 계산 및 출력
  const parallelAvg = parallelResults.reduce((a, b) => a + b, 0) / iterations;
  const sequentialAvg = sequentialResults.reduce((a, b) => a + b, 0) / iterations;

  console.log('\n=== Performance Test Results ===');
  console.log(`Average Parallel Execution Time: ${parallelAvg.toFixed(2)}ms (${(parallelAvg / 1000).toFixed(2)}s)`);
  console.log(
    `Average Sequential Execution Time: ${sequentialAvg.toFixed(2)}ms (${(sequentialAvg / 1000).toFixed(2)}s)`,
  );
  console.log(
    `Performance Difference: ${(((sequentialAvg - parallelAvg) / sequentialAvg) * 100).toFixed(2)}% faster with parallel execution`,
  );

  return {
    parallelResults,
    sequentialResults,
    parallelAvg,
    sequentialAvg,
  };
}

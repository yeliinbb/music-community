import { CommonPostType } from '@/types/posts.type';
import { createClient } from '@/utils/supabase/client';

export const fetchPosts = async (id: string): Promise<CommonPostType> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('posts').select('*,users(nickname, email)').eq('id', id).single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    process.stderr.write(`게시물 불러오기 실패: ${error}\n`);
    throw error;
  }
};

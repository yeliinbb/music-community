      import { createClient } from '@/utils/supabase/server';

      interface UpdateProps {
        userId: string;
        profilePictureFile: File;
      }

      export const updateUserProfile = async ({ userId, profilePictureFile }: UpdateProps) => {
        const supabase = createClient();

        try {
          if (profilePictureFile) {
            const fileName = `${userId}/${Date.now()}_${profilePictureFile.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('profile')
              .upload(fileName, profilePictureFile, {
                cacheControl: '3600',
                upsert: false,
              });

            if (uploadError) throw new Error(`프로필 사진 업로드 오류: ${uploadError.message}`);

            const profileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${uploadData.path}`;

            const { data: updateData, error: updateError } = await supabase
              .from('users')
              .update({ profileUrl })
              .eq('id', userId);

            if (updateError) throw new Error(`사용자 프로필 업데이트 실패: ${updateError.message}`);

            return updateData;
          }
        } catch (error) {
          throw new Error(`사용자 프로필 업데이트 실패: ${error}`);
        }
      };
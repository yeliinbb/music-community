import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const userId = params.id;
  console.log("userId test=>", userId);
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, nickname, email, profileUrl")
      .eq("id", userId)
      .single();

    if (error) throw new Error(`사용자 정보 가져오기에 실패했습니다 : ${error.message}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("사용자 정보 가져오기에 실패했습니다:", error);
    return NextResponse.json({ error: "사용자 정보 가져오기에 실패했습니다" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest, { params }: { params: { id: string } }, profilePictureFile: File) => {
const userId = params.id;
console.log("userId test=>", userId);
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
    
    return uploadData;
  }

} catch (error) {
  console.error("사용자 프로필 이미지 업데이트에 실패했습니다:", error);
  return NextResponse.json({ error: "사용자 프로필 이미지 업데이트에 실패했습니다" }, { status: 500 });
}
}

// export const PUT = async (request: NextRequest, { params }: { params: { id: string } }, profilePictureUrl: string) => {
//   const userId = params.id;
//   console.log("userId test=>", userId);
//   const supabase = createClient();

//   try {

//   } catch(error) {

//   }
// }
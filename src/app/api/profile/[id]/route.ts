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
}



export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const userId = params.id;
  const supabase = createClient();

  try {
    const formData = await request.formData();
    const profilePictureFile = formData.get('profilePictureFile') as File;

    if (!profilePictureFile) {
      return NextResponse.json({ error: '프로필 사진이 전송되지 않았습니다.' }, { status: 400 });
    }

    const fileName = `${userId}/${Date.now()}_${profilePictureFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
    .from('profile')
    .upload(fileName, await profilePictureFile.arrayBuffer(), {
      contentType: profilePictureFile.type,
      cacheControl: '3600',
      upsert: false,
    });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: `프로필 사진 업로드 오류: ${uploadError.message}` }, { status: 500 });
    }

    return NextResponse.json(uploadData, { status: 200 });

  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json({ error: `서버 오류: ${error}` }, { status: 500 });
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
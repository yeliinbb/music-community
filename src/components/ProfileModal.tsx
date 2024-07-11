"use client";

import React, { useRef, useState, useEffect } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoIosSettings } from "react-icons/io";

interface ProfileModalProps {
  userId: string;
}
// 프로필 사진 업데이트 함수
const updateProfilePicture = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append('profilePictureFile', file);

  const response = await fetch(`/api/profile/${userId}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('프로필 사진 업데이트 실패');
  }

  return response.json();
};


const ProfileModal = ({ userId }: ProfileModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile);
    }
  };
  const handleProfileSubmit = async () => {
    if (file) {
      try {
        await updateProfilePicture(userId, file);
        alert('프로필 사진이 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('프로필 사진 업데이트 오류:', error);
        alert('프로필 사진 업데이트에 실패했습니다.');
      }
    }
  };


  return (
    <>
      <Button onPress={onOpen} className="w-5 h-5 min-w-0 p-0">
        <IoIosSettings />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#66b3cf] dark:bg-[#19172c] text-black",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <label htmlFor="hiddenFileInput">📷 프로필 사진 변경</label>
                <input
                  onChange={handleFileInputChange}
                  type="file"
                  ref={fileInputRef}
                  id="hiddenFileInput"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button className="bg-black text-white shadow-lg shadow-indigo-500/20 rounded-lg" onPress={handleProfileSubmit}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

"use client";

import React, { useRef } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const ProfileModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fileInputRef = useRef(null);

  const handleFileInputChange = async (file) => {
    // try {
    //   await api.user.updateUserProfile(userId, file);
    //   await fetchUserProfilePicture();
    // } catch (error) {
    //   console.error('프로필 사진 업로드 및 사용자 데이터 업데이트 오류:', error.message);
    // }
    console.log("inputchange");
  };
  console.log('first')

  //const imageUrl = userProfileData.profilePictureUrl ?? profileDefaultUrl;
  return (
    <>
      <Button onPress={onOpen} className="w-5 h-5 min-w-0 p-0">
        <img src="/setting.svg" alt="프로필 사진 변경" className="w-5 h-5" />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <label htmlFor="hiddenFileInput">프로필 사진 변경</label>
                <input
                  onChange={(e) => handleFileInputChange(e.target.files[0])}
                  type="file"
                  ref={fileInputRef}
                  id="hiddenFileInput"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
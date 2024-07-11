"use client";

import React, { useRef } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoIosSettings } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const ProfileModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fileInputRef = useRef(null);

  const handleFileInputChange = async (file) => {
    console.log("inputchange");
  };
  console.log("first");

  //const imageUrl = userProfileData.profilePictureUrl ?? profileDefaultUrl;
  return (
    <>
      <Button
        onPress={onOpen}
        className="w-5 h-5 min-w-0 p-0"
        data-tooltip-id="프로필 수정"
        data-tooltip-content="프로필 수정"
      >
        <IoIosSettings />
      </Button>
      <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: "#858585", color: "white" }} />
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
                  onChange={(e) => handleFileInputChange(e.target.files[0])}
                  type="file"
                  ref={fileInputRef}
                  id="hiddenFileInput"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button className="bg-black text-white shadow-lg shadow-indigo-500/20 rounded-lg" onPress={onClose}>
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

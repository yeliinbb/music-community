'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from '@nextui-org/react';
import { IoIosSettings } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile } from '@/types/users.type';
import { toast } from 'react-toastify';

interface ProfileModalProps {
  userId: string;
}
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const ProfileModal = ({ userId }: ProfileModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const updateProfilePicture = async ({ userId, file }: UserProfile) => {
    const formData = new FormData();
    formData.append('profilePictureFile', file);

    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();

      const profileUrl = `${SUPABASE_URL}/storage/v1/object/public/profile/${data.path}`;

      const updateResponse = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileUrl }),
      });

      if (!updateResponse.ok) {
        throw new Error('유저의 프로필 정보를 업데이트하는 데 실패했습니다. 다시 시도해 주세요');
      }

      const updateData = await updateResponse.json();

      return { uploadData: data, updateData };
    } catch (error) {
      console.error('Error in file upload or database update:', error);
      throw error;
    }
  };

  const profileUpdateMutation = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', userId] });
      toast.success('프로필 사진이 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('프로필 사진 업데이트 오류:', error);
      toast.warn('프로필 사진 업데이트에 실패했습니다.');
    },
  });

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleProfileSubmit = () => {
    if (!file) {
      toast.warn('프로필 사진을 선택해주세요.');
      return;
    }

    profileUpdateMutation.mutate({ userId, file });
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-5 h-5 min-w-0 p-0"
        data-tooltip-id="프로필 수정"
        data-tooltip-content="프로필 수정"
        aria-label="profile edit button"
      >
        <IoIosSettings />
      </Button>
      <Tooltip id="프로필 수정" place="bottom" style={{ backgroundColor: '#858585', color: 'white' }} />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-[#66b3cf] text-black rounded-lg',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div>
                  <p className="text-xl font-bold">📷 프로필 사진 변경하기</p>
                  <input
                    onChange={handleFileInputChange}
                    type="file"
                    id="hiddenFileInput"
                    className="mt-5"
                    accept="image/*"
                  />
                  <div className="flex flex-row justify-end gap-x-5 mt-5">
                    <Button className="bg-gray-300 rounded-lg" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                    <Button
                      className="bg-black text-white shadow-lg shadow-indigo-500/20 rounded-lg"
                      onPress={handleProfileSubmit}
                    >
                      확인
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

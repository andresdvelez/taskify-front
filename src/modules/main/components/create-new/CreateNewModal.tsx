import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useProjectForm } from "../../hooks/useProjectForm";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateNewModal = ({ isOpen, onClose }: ProjectModalProps) => {
  const { handleSubmit, onSubmit, control, errors } = useProjectForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Project name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Project Name"
                    placeholder="Enter project name"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    placeholder="Enter project description"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create Project
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

import {
  AspectRatio,
  Box,
  Button,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import type { Area } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { MdUpload } from "react-icons/md";
import getCroppedImg from "../utils/cropImage";

const ImageInput = ({
  onImageChange,
}: {
  onImageChange: (file: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [finalPreview, setFinalPreview] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      onOpen();
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const file = new File([croppedBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    const previewURL = URL.createObjectURL(file);
    setFinalPreview(previewURL);
    onImageChange(file);
    onClose();
  };

  return (
    <VStack spacing={4} align="flex-start" w="full">
      {/* Hidden file input */}
      <Input
        type="file"
        accept="image/*"
        ref={inputRef}
        display="none"
        onChange={handleFileChange}
      />

      {/* Upload dropzone-like box */}
      <Box
        w="full"
        border="1px dashed"
        borderColor="gray.400"
        borderRadius="md"
        p={6}
        textAlign="center"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        _hover={{ borderColor: "teal", bg: "gray.700" }}
      >
        <VStack spacing={2}>
          <Icon as={MdUpload} boxSize={6} color="gray.500" />
          <Text fontWeight="medium" color="gray.600">
            Click to upload or drag and drop
          </Text>
          <Text fontSize="sm" color="gray.500">
            PNG, JPG (recommended size: 1920x1080 or lower)
          </Text>
        </VStack>
      </Box>

      {/* Preview */}
      {finalPreview ? (
        <Box mt={2} w="100%" maxW="400px">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Preview:
          </Text>
          <AspectRatio
            ratio={16 / 9}
            w="full"
            borderRadius="md"
            overflow="hidden"
          >
            <Image
              src={finalPreview}
              alt="Cropped Image Preview"
              objectFit="cover"
            />
          </AspectRatio>
        </Box>
      ) : (
        <Text color="gray.500" fontSize="sm">
          No image selected
        </Text>
      )}

      {/* Cropper Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop your image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" width="100%" height="400px" bg="gray.100">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box mt={4}>
              <Text fontSize="sm" mb={1}>
                Zoom
              </Text>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(val) => setZoom(val)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="ghost" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCropConfirm}>
              Crop & Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ImageInput;

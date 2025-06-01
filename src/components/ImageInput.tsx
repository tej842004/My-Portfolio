// import { useState, useRef } from "react";
// import { Box, Button, Image, Input, Text, VStack } from "@chakra-ui/react";

// const ImageInput = ({
//   onImageChange,
// }: {
//   onImageChange: (file: File) => void;
// }) => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.length) return;

//     const file = e.target.files[0];

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     setPreview(URL.createObjectURL(file));
//     onImageChange(file);
//   };

//   return (
//     <VStack spacing={4} align="flex-start">
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         ref={inputRef}
//         display="none"
//       />
//       <Button
//         onClick={() => inputRef.current?.click()}
//         variant="outline"
//         fontWeight="normal"
//         borderWidth="1px"
//         borderStyle="solid"
//         borderColor="gray.400"
//       >
//         Choose Image
//       </Button>

//       {preview ? (
//         <Box
//           boxSize="200px"
//           position="relative"
//           overflow="hidden"
//           borderRadius="md"
//           border="1px solid #ccc"
//         >
//           <Image
//             src={preview}
//             alt="Image Preview"
//             objectFit="cover"
//             width="100%"
//             height="100%"
//           />
//         </Box>
//       ) : (
//         <Text color="gray.500">No image selected</Text>
//       )}
//     </VStack>
//   );
// };

// export default ImageInput;
import { useState, useRef } from "react";
import { Box, Button, Image, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios"; // For making HTTP requests

const ImageInput = ({
  onImageChange,
}: {
  onImageChange: (filename: string | null) => void; // Changed to string | null
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Upload file to the backend
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const filename = response.data.filename; // Get the filename from the response
      setPreview(URL.createObjectURL(file)); // Set preview for display
      onImageChange(filename); // Pass the filename to the parent
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <VStack spacing={4} align="flex-start">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        display="none"
      />
      <Button
        onClick={() => inputRef.current?.click()}
        variant="outline"
        fontWeight="normal"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.400"
      >
        Choose Image
      </Button>

      {preview ? (
        <Box
          boxSize="200px"
          position="relative"
          overflow="hidden"
          borderRadius="md"
          border="1px solid #ccc"
        >
          <Image
            src={preview}
            alt="Image Preview"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
      ) : (
        <Text color="gray.500">No image selected</Text>
      )}
    </VStack>
  );
};

export default ImageInput;

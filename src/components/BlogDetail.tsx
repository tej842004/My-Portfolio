// import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
// import React from "react";
// import Elon from "../../public/images/elon.jpg";
// import Prashant from "../../public/images/prash.jpg";

// const BlogDetail = () => {
//   return (
//     <VStack
//       alignItems="flex-start"
//       justifyContent="flex-start"
//       marginTop={10}
//       gap={4}
//     >
//       <Heading>i’m not disciplined yet. but i’m trying</Heading>

//       <HStack gap={3}>
//         <Image
//           src={Prashant}
//           objectFit="cover"
//           height="50px"
//           width="50px"
//           borderRadius="full"
//         />
//         <Text>Prashant Chauhan</Text>
//         <Text>May 29, 2025</Text>
//         <Text>4 min read</Text>
//       </HStack>

//       <Image
//         src={Elon}
//         height="600px"
//         width="100%"
//         objectFit="cover"
//         borderRadius="2xl"
//       />

//       <Box maxW="700px">
//         <Text lineHeight={2}>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
//           provident culpa libero asperiores ea natus. Sed necessitatibus omnis,
//           voluptas magni earum animi velit sequi corrupti quaerat? Maiores
//           voluptate, eos natus aperiam similique dolores, labore quis corporis
//           repudiandae et incidunt eius nulla. Deleniti vitae, quia inventore
//           harum dignissimos nisi modi cupiditate impedit ab, in, blanditiis
//           fugiat ducimus? Repellat explicabo, voluptatem eos ducimus itaque
//           molestiae voluptatibus perspiciatis facere molestias rem libero odit
//           fugiat sint eum quae accusamus cum aut eius, minima nihil enim? Enim
//           dolore similique ipsum placeat, esse numquam libero ea laudantium,
//           rerum commodi ducimus sapiente rem, error fugit sequi. Debitis.
//         </Text>
//         <Text lineHeight={2}>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
//           provident culpa libero asperiores ea natus. Sed necessitatibus omnis,
//           voluptas magni earum animi velit sequi corrupti quaerat? Maiores
//           voluptate, eos natus aperiam similique dolores, labore quis corporis
//           repudiandae et incidunt eius nulla. Deleniti vitae, quia inventore
//           harum dignissimos nisi modi cupiditate impedit ab, in, blanditiis
//           fugiat ducimus? Repellat explicabo, voluptatem eos ducimus itaque
//           molestiae voluptatibus perspiciatis facere molestias rem libero odit
//           fugiat sint eum quae accusamus cum aut eius, minima nihil enim? Enim
//           dolore similique ipsum placeat, esse numquam libero ea laudantium,
//           rerum commodi ducimus sapiente rem, error fugit sequi. Debitis.
//         </Text>
//         <Text lineHeight={2}>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
//           provident culpa libero asperiores ea natus. Sed necessitatibus omnis,
//           voluptas magni earum animi velit sequi corrupti quaerat? Maiores
//           voluptate, eos natus aperiam similique dolores, labore quis corporis
//           repudiandae et incidunt eius nulla. Deleniti vitae, quia inventore
//           harum dignissimos nisi modi cupiditate impedit ab, in, blanditiis
//           fugiat ducimus? Repellat explicabo, voluptatem eos ducimus itaque
//           molestiae voluptatibus perspiciatis facere molestias rem libero odit
//           fugiat sint eum quae accusamus cum aut eius, minima nihil enim? Enim
//           dolore similique ipsum placeat, esse numquam libero ea laudantium,
//           rerum commodi ducimus sapiente rem, error fugit sequi. Debitis.
//         </Text>
//       </Box>
//     </VStack>
//   );
// };

// export default BlogDetail;
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Prashant from "../assets/images/prash.jpg";
import RCB from "../assets/images/rcb.webp";

const BlogDetail = () => {
  return (
    <VStack align="stretch" spacing={6} mt={10}>
      {/* Title */}
      <Heading fontSize={{ base: "2xl", md: "4xl" }} lineHeight="short">
        I’m not disciplined yet. But I’m trying.
      </Heading>

      {/* Author Info */}
      <HStack spacing={2} wrap="wrap">
        <Image
          src={Prashant}
          alt="Author"
          objectFit="cover"
          boxSize="30px"
          borderRadius="full"
        />
        <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }}>
          Prashant Chauhan
        </Text>
        <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
          May 29, 2025
        </Text>
        <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
          · 4 min read
        </Text>
      </HStack>

      {/* Blog Banner Image */}
      <Image
        src={RCB}
        alt="Blog Banner"
        height="100%"
        width="100%"
        objectFit="cover"
        borderRadius="2xl"
      />

      {/* Content */}
      <VStack spacing={4} align="stretch">
        {[...Array(5)].map((_, idx) => (
          <Text
            key={idx}
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="tall"
            color="gray.250"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            provident culpa libero asperiores ea natus. Sed necessitatibus
            omnis, voluptas magni earum animi velit sequi corrupti quaerat?
            Maiores voluptate, eos natus aperiam similique dolores, labore quis
            corporis repudiandae et incidunt eius nulla. Deleniti vitae, quia
            inventore harum dignissimos nisi modi cupiditate impedit ab, in,
            blanditiis fugiat ducimus?
          </Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default BlogDetail;

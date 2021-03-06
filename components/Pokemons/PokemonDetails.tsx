import {
  Box,
  SimpleGrid,
  type BoxProps,
  Flex,
  VStack,
  HStack,
  ScaleFade,
  Stack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ProgressBar from "@ramonak/react-progress-bar";
import MoreDetails from "components/Pokemons/MoreDetails";
import { GetPokemon } from "types/GetPokemon";
import colorTypes from "components/functions/colorTypes";
import StatsComponent from "./StatsComponent";
import AbilitiesComponent from "./AbilitiesComponent";

export const MotionBox = motion<BoxProps>(Box);

type PokemonDetailsType = {
  details: GetPokemon["pokemon"];
};

const PokemonDetails = ({ details }: PokemonDetailsType) => {
  const [viewMore, setViewMore] = useState(false);

  const handleViewMore = () => setViewMore(true);
  const handleViewMoreClose = () => setViewMore(false);
  // console.log(details.moves);
  return (
    <Stack
      width="inherit"
      height="inherit"
      align="center"
      justify="center"
      direction={{
        base: "column",
        lg: "row",
      }}
      p=" 20px 0px"
    >
      <Box
        background="#f97316"
        width="30rem"
        boxShadow={`0 4px 8px 0 gray, 0 6px 20px 0 gray`}
        borderRadius="20px"
        borderColor="#CAEFFF"
      >
        <Box
          position="relative"
          borderRadius="20px 20px 60px 60px"
          background={colorTypes(
            details!.element?.length <= 1
              ? `${details?.element[0]?.type?.name}`
              : `${details?.element[1]?.type?.name}`
          )}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${details?.id}.png`}
            alt={details?.name}
            priority
            layout="responsive"
            width={20}
            height={20}
          />
          {/** Display the Abilities */}
          <AbilitiesComponent
            abilities={details?.abilities!}
            element={details?.element!}
          />
        </Box>
        <Box width="inherit" height="inherit">
          <Box
            display="flex"
            fontSize={40}
            fontFamily="sans-serif"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="widest"
            color="white"
            justifyContent="center"
          >
            {details?.name}
          </Box>
          <Box height={10}>
            <Flex justify="center">
              {details?.element.map((e) => {
                return (
                  <Box
                    key={e.type?.name}
                    p="0px 15px 0px 15px"
                    borderRadius={15}
                    border="2px"
                    borderColor="white"
                    background={colorTypes(`${e.type?.name}`)}
                    m="0px 10px"
                    fontSize={17}
                    fontWeight="bold"
                    color="white"
                    height={31}
                  >
                    {e.type?.name}
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box mr={2}>
            <Flex justify="center" justifyContent="space-around">
              <VStack spacing="5px">
                <Box fontSize={30} fontWeight="bold" fontFamily="sans-serif">
                  {details?.weight} kg
                </Box>
                <Box fontStyle="italic" fontWeight="semibold">
                  Weight
                </Box>
              </VStack>
              <VStack spacing="5px">
                <Box fontSize={30} fontWeight="bold" fontFamily="sans-serif">
                  {details?.height} m
                </Box>
                <Box fontStyle="italic" fontWeight="semibold">
                  Height
                </Box>
              </VStack>
            </Flex>
          </Box>

          {/**Display Stats Section */}
          <StatsComponent stats={details?.stats!} element={details?.element!} />

          <Box justifyContent="center" display="flex" width="inherit">
            <MotionBox
              width={120}
              pb={2}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              _hover={{
                cursor: "pointer",
                fontWeight: "semibold",
              }}
              onClick={handleViewMore}
              justifyContent="center"
              textAlign="center"
              color="white"
            >
              View more{">>"}
            </MotionBox>
          </Box>
        </Box>
      </Box>
      {viewMore ? (
        <ScaleFade initialScale={0.9} in={viewMore}>
          <Box
            background="#f97316"
            ml={10}
            width={560}
            height="inherit"
            boxShadow={`0 4px 8px 0 gray, 0 6px 20px 0 gray`}
            borderRadius="20px"
            borderColor="#CAEFFF"
          >
            <MoreDetails
              moves={details!.moves}
              setViewMore={handleViewMoreClose}
            />
          </Box>
        </ScaleFade>
      ) : null}
    </Stack>
  );
};

export default PokemonDetails;

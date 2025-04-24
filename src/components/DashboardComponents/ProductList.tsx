import { Box, SimpleGrid, useBreakpointValue, Flex, Spinner, Center, Text } from '@chakra-ui/react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from '@/components/DashboardComponents/ProductCard'
import useReportStore from '@/store/useReportStore';

export default function ProductList() {
  const isMobile = useBreakpointValue({ base: true, sm: true ,md: false })
  const { topBestSellingsReport } = useReportStore();

  // Loading state
  if (!topBestSellingsReport) {
    return (
      <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" width="100%">
        <Center>
          <Spinner color="green.500" />
        </Center>
      </Box>
    );
  }

  const limitedProducts = topBestSellingsReport.topProducts?.slice(0, 4) || [];

  // Empty state
  if (limitedProducts.length === 0) {
    return (
      <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" width="100%">
        <Center>
          <Text color="gray.500">No hay productos disponibles</Text>
        </Center>
      </Box>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    cssEase: 'ease-out',
    swipeToSlide: true,
    touchMove: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        }
      }
    ]
  }

  const content = isMobile ? (
    <Box mx="-16px" width="calc(100% + 32px)" className="mobile-slider">
      <Slider {...settings}>
        {limitedProducts.map((product, idx) => (
          <Box key={idx} px={2}>
            <ProductCard {...product} />
          </Box>
        ))}
      </Slider>
    </Box>
  ) : (
    <SimpleGrid 
      columns={{ base: 1, sm: 2 }} 
      gap={4} 
      width="100%" 
      templateColumns={{ base: "1fr", sm: "repeat(auto-fit, minmax(240px, 1fr))" }}
      alignItems="stretch"
    >
      {limitedProducts.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </SimpleGrid>
  )

  return (
    <Box>
      {isMobile ? (
        <Box width="100%" pb={4}>
          {content}
        </Box>
      ) : (
        <Box 
          bg="white" 
          p={6} 
          borderRadius="2xl" 
          boxShadow="sm" 
          width="100%"
          overflow="hidden"
        >
          <Flex width="100%" justify="center">
            <Box width="100%" maxW="900px">
              {content}
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
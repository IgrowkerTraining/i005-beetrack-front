import { Box, SimpleGrid, useBreakpointValue, Text, Flex } from '@chakra-ui/react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from '@/components/DashboardComponents/ProductCard'

const products = [
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
]

export default function ProductList() {
  const isMobile = useBreakpointValue({ base: true, sm: true ,md: false })

  const limitedProducts = products.slice(0, 4)

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1.6,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    cssEase: 'ease-out',
    swipeToSlide: true,
    touchMove: true,
    accessibility: true,
  }

  const content = isMobile ? (
    <Box mx="-16px" width="calc(100% + 32px)" className="mobile-slider">
      <Slider {...settings}>
        {limitedProducts.map((product, idx) => (
          <Box key={idx} px={1}>
            <ProductCard {...product} />
          </Box>
        ))}
      </Slider>
    </Box>
  ) : (
    <SimpleGrid columns={2} gap={4} width="100%" templateColumns="repeat(2, 1fr)">
      {limitedProducts.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </SimpleGrid>
  )

  return (
    <Box>
      {isMobile ? (
        <Box width="100%">
          {content}
        </Box>
      ) : (
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" width="100%">
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Productos más vendidos este mes
          </Text>
          <Flex overflowX="auto" width="100%">
            {content}
          </Flex>
        </Box>
      )}
    </Box>
  )
}
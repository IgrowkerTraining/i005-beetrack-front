import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Box } from '@chakra-ui/react';

type Props = {
  onScanSuccess: (code: string) => void;
};

const ProductScanner = ({  onScanSuccess }: Props) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0, disableFlip: false },
        (decodedText) => {
          if (isRunningRef.current) {
            isRunningRef.current = false;
            onScanSuccess(decodedText);

            scanner
              .stop()
              .then(() => console.log("Scanner parado"))
              .catch((err) => console.warn("Error al parar el scanner:", err));
          }
        },
        (errorMessage) => {
          //No pongo aquí nunguna lógica de error porque el lector estaría tirando 10 errores por segundo hasta que detecta el código de barras.
        }
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => {
        console.error("Error al iniciar el scanner:", err);
      });

    return () => {
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current
          .stop()
          .then(() => console.log("Escanner parado al desmontar"))
          .catch((err) => console.warn("Error al limpiar scanner:", err));
      }
    };
  }, [onScanSuccess]);

  return (
    <Box
      id="reader"
      w="100%"
      maxW="350px"
      h="260px"
      mx="auto"
      borderRadius="3xl"
      overflow="hidden"
      bg="gray.100"
    />
  );
};

export default ProductScanner;

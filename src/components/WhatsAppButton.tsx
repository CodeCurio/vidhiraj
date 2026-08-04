'use client';

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello Vidhiraj Global Impex! I am interested in your handicraft products. Please share more details.'
);

export default function WhatsAppButton({ number }: { number: string }) {
  if (!number) return null;
  return (
    <a
      href={`https://wa.me/${number}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg whatsapp-pulse"
      style={{ background: '#25D366', position: 'fixed' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
      >
        <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.664 4.8 1.82 6.81L2 30l7.378-1.786A13.96 13.96 0 0016.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2zm0 25.6a11.55 11.55 0 01-5.89-1.612l-.42-.25-4.378 1.06 1.096-4.26-.274-.44A11.555 11.555 0 014.4 16.002c0-6.404 5.2-11.6 11.602-11.6 6.4 0 11.598 5.196 11.598 11.6S22.404 27.6 16.002 27.6zm6.358-8.68c-.348-.175-2.064-1.016-2.384-1.133-.32-.117-.553-.175-.786.175-.232.348-.9 1.133-1.104 1.365-.203.232-.405.262-.754.087-.348-.175-1.47-.542-2.8-1.727-1.034-.924-1.733-2.064-1.936-2.412-.203-.348-.022-.535.153-.708.158-.155.348-.406.523-.61.175-.203.232-.348.348-.58.116-.232.058-.435-.03-.61-.087-.175-.786-1.892-1.077-2.59-.283-.68-.57-.587-.785-.598l-.668-.012c-.232 0-.61.087-.928.435-.32.348-1.22 1.19-1.22 2.903s1.25 3.368 1.424 3.6c.175.232 2.46 3.754 5.961 5.26.833.36 1.483.574 1.99.734.836.265 1.597.228 2.199.138.67-.1 2.064-.842 2.355-1.656.29-.813.29-1.51.203-1.656-.087-.146-.32-.232-.668-.406z" />
      </svg>
    </a>
  );
}

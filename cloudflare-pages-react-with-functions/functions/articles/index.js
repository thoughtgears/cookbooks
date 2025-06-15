const index = [
  {id: 1, path: 'introduction-to-cloudflare-pages',},
  {id: 2, path: 'deploying-a-react-app-to-cloudflare-pages',},
  {id: 3, path: 'tailwind-with-react',},
];

export const onRequest = async (context) => {
  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
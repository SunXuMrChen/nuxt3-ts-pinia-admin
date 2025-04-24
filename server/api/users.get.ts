export default defineEventHandler((event) => {
  let { req, res } = event.node;

  console.log(req);
  console.log(res);

  return {
    code: 200,
    data: {
      name: "liujun",
      age: 18,
      token: "aabbcc",
    },
  };
});

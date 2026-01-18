import { prisma } from "./lib/prisma";

async function run() {
  const createUser = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
  });
  console.log("User created:", createUser);

  const createPost = await prisma.post.create({
    data: {
      title: "Hello World",
      content: "I am Jane Doe and this is my first post.",
      authorId: 2,
    },
  });
  console.log("Post created:", createPost);

  const createProfile = await prisma.profile.create({
    data: {
      bio: "Software developer and blogger.",
      userId: 1,
    },
  });
  console.log("Profile created:", createProfile);
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

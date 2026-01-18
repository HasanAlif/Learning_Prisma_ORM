import { prisma } from "./lib/prisma";

async function run() {
  //   Create Operations
  const createUser = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
  });
  console.log("User created:", createUser);

  //   Create Post and Profile for the User
  const createPost = await prisma.post.create({
    data: {
      title: "Hello World",
      content: "I am Jane Doe and this is my first post.",
      authorId: 2,
    },
  });
  console.log("Post created:", createPost);

  // Create Profile for the User
  const createProfile = await prisma.profile.create({
    data: {
      bio: "Software developer & Tester.",
      userId: 2,
    },
  });
  console.log("Profile created:", createProfile);

  // Read Operations
  const includeUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log("All Users: ");
  console.dir(includeUsers, { depth: Infinity });

  const selectUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      posts: true,
      profile: true,
    },
  });
  console.log("All Users: ");
  console.dir(selectUsers, { depth: Infinity });

  // Update Operations
  const updateProfile = await prisma.profile.update({
    where: { userId: 2 },
    data: {
      bio: "Web developer and Frontend Engineer",
      dateOfBirth: new Date("1990-05-15"),
    },
    select: {
      id: true,
      bio: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  console.log("Profile updated:", updateProfile);

  //   GetUserDataById
  const getUserDataById = await prisma.user.findUnique({
    where: { id: 2 },
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log("Get User Data By Id:", getUserDataById);

  // Delete Operations
  // const deleteUser = await prisma.user.delete({
  //   where: { id: 4 },
  // });
  // console.log("User deleted Successfully:", deleteUser);

  const deleteUser = async () => {
    await prisma.post.deleteMany({
      where: { authorId: 2 },
    });
    await prisma.profile.delete({
      where: { userId: 2 },
    });
    await prisma.user.delete({
      where: { id: 2 },
    });
  };
  console.log("User deleted Successfully");

  // Upsert Operation
  const upsertUser = await prisma.user.upsert({
    where: {
      email: "jkr@gmail.com",
    },
    update: {
      name: "John Kennedy 2",
    },
    create: {
      name: "John Kennedy 3",
      email: "jkr@gmail.com",
    },
  });
  console.log("User upserted successfully:", upsertUser);
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

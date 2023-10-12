import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

interface CustomAdapterUser extends Omit<AdapterUser, "id"> {
  groupId?: string;
}
export function CustomPrismaAdapter(prisma: PrismaClient) {
  const defaultAdapter = PrismaAdapter(prisma);

  return {
    ...defaultAdapter,
    createUser: async (profile: CustomAdapterUser) => {
      // Your custom logic here
      profile.groupId = "65142379c592bef7f2b1e3c7";

      // Then call the default createUser method
      if (defaultAdapter.createUser) {
        return await defaultAdapter.createUser(profile);
      }
      throw new Error("User creation failed");
    },
  };
}

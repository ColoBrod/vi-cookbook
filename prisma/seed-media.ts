import prisma from "@/lib/prisma";

export enum MediaUuid {
  BorshchKlassicheskiy = '60e27a95-584a-4def-b576-dadc6f9c4329',
  Rassolnik = 'a810db64-0b97-49ce-852f-90728f651887',
  MushroomCreamSoup = '937bf519-77ee-4075-b3cf-629add30e884',
  TofuScrambled = '227842eb-2c67-45e6-b076-9d54ebcc3662',
  LentilSoup = 'f66330be-73ff-4b0f-b98c-def49ed1a406',
  Schi = '41b892a9-cc6b-4a7c-8b5b-10b566e6bcab',
  SweetMustardSauce = '1c354b9b-a32a-4ee3-ac53-84e674f95c3b',
  PestoRossoSauce = '7b5a3a69-b9d4-4690-b69d-8f3bc3cb7e5d',
  Ketchunez = 'd5bab90e-25ff-472f-b161-ede05a771a3d',
  TofuSandwich = 'b6576ace-f504-45fd-8c33-6d5253a3edf6',
  ItalianSandwich = 'b9a5b10a-acb3-42c8-bcb9-292310af36db',
  Shawarma = '98082453-e025-4bb3-92c7-b7386c709753',
  FalafelRollClassic = '7e3c0c0a-8496-4c24-aa33-fac4d61cb157',
  FalafelRollItalian = '947c2c18-1b7a-41b8-a040-4f105333b21d',
}

export async function createMedia() {
  await prisma.media.createMany({
    data: [
      {
        uuid: MediaUuid.BorshchKlassicheskiy,
        slug: MediaUuid.BorshchKlassicheskiy,
        path: `/uploads/recipes/${MediaUuid.BorshchKlassicheskiy}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.Rassolnik,
        slug: MediaUuid.Rassolnik,
        path: `/uploads/recipes/${MediaUuid.Rassolnik}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.MushroomCreamSoup,
        slug: MediaUuid.MushroomCreamSoup,
        path: `/uploads/recipes/${MediaUuid.MushroomCreamSoup}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.TofuScrambled,
        slug: MediaUuid.TofuScrambled,
        path: `/uploads/recipes/${MediaUuid.TofuScrambled}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.LentilSoup,
        slug: MediaUuid.LentilSoup,
        path: `/uploads/recipes/${MediaUuid.LentilSoup}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.Schi,
        slug: MediaUuid.Schi,
        path: `/uploads/recipes/${MediaUuid.Schi}.webp`,
        mimeType: 'image/webp',
      },
      {
        uuid: MediaUuid.TofuSandwich,
        slug: MediaUuid.TofuSandwich,
        path: `/uploads/recipes/${MediaUuid.TofuSandwich}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.ItalianSandwich,
        slug: MediaUuid.ItalianSandwich,
        path: `/uploads/recipes/${MediaUuid.ItalianSandwich}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.Shawarma,
        slug: MediaUuid.Shawarma,
        path: `/uploads/recipes/${MediaUuid.Shawarma}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.FalafelRollClassic,
        slug: MediaUuid.FalafelRollClassic,
        path: `/uploads/recipes/${MediaUuid.FalafelRollClassic}.jpg`,
        mimeType: 'image/jpg',
      },
      {
        uuid: MediaUuid.FalafelRollItalian,
        slug: MediaUuid.FalafelRollItalian,
        path: `/uploads/recipes/${MediaUuid.FalafelRollItalian}.jpg`,
        mimeType: 'image/jpg',
      },

    ],
  });
}

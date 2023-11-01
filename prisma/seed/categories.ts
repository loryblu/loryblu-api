import { PrismaClient, TaskCategory } from '@prisma/client';

const taskCategories: Array<Partial<TaskCategory>> = [
  {
    id: '44f29121-b7b1-4d1a-bbff-5f1cf2fc5497',
    group: 'study',
    category: 'school',
  },
  {
    id: 'e9f17f88-7c94-4953-a1eb-bce035c483d8',
    group: 'study',
    category: 'reinforcement',
  },
  {
    id: '8c004aa0-961d-4ec4-b6fe-cb70cbc0c4c1',
    group: 'study',
    category: 'languages',
  },
  {
    id: '648d5ce9-6880-476e-bf98-0d7139aadb2c',
    group: 'study',
    category: 'sport',
  },
  {
    id: '549a70f6-3f9c-4640-9b1e-b23d69f1d213',
    group: 'study',
    category: 'reading',
  },
  {
    id: '6166d506-b5f0-4feb-b900-e78d23f1e6ac',
    group: 'study',
    category: 'musicTherapy',
  },
  {
    id: '49f9aed1-e583-427c-82bf-a596513a6707',
    group: 'study',
    category: 'psychologist',
  },
  {
    id: 'aa61d985-93a9-4ee0-b465-2e73848c84a8',
    group: 'study',
    category: 'speechTherapist',
  },
  {
    id: '1b2f2a80-9b3e-455d-aab4-66ba68e6dac0',
    group: 'study',
    category: 'pedagogue',
  },
  {
    id: '7da68252-143d-4e98-b5b0-17c7ea9953a3',
    group: 'study',
    category: 'occupationalTherapist',
  },
  {
    id: '6dfc15bb-f422-4c75-b2cc-bf3e9806c76a',
    group: 'routine',
    category: 'bathTime',
  },
  {
    id: '61123e8a-22af-421f-8e0d-6356c920803b',
    group: 'routine',
    category: 'brushTeeth',
  },
  {
    id: '15d2ceb0-ab06-4cf6-8e46-54ccf8c1e556',
    group: 'routine',
    category: 'breakfast',
  },
  {
    id: '5431e6bf-c1d3-43b6-9289-843ca6455ee3',
    group: 'routine',
    category: 'lunch',
  },
  {
    id: '27e4089a-8643-487d-9634-2332419c2adc',
    group: 'routine',
    category: 'afternoonLunch',
  },
  {
    id: 'a6284261-134d-4c96-ad1c-4afd50ae493d',
    group: 'routine',
    category: 'dinner',
  },
  {
    id: '161bf998-4bf3-4c9f-bd72-1542bad40ed9',
    group: 'routine',
    category: 'drinkWater',
  },
  {
    id: '86008ded-8ba1-4719-a55e-ef6d8d4cb8b1',
    group: 'routine',
    category: 'playTime',
  },
  {
    id: 'bc920d36-d024-481b-9923-3d2d6a478a81',
    group: 'routine',
    category: 'tvReleased',
  },
  {
    id: '63631065-7485-42d1-a9c1-523787954f56',
    group: 'routine',
    category: 'videoGameReleased',
  },
];

export default async (prisma: PrismaClient) => {
  for await (const { id, group, category } of taskCategories) {
    await prisma.taskCategory.upsert({
      where: {
        id,
      },
      update: {
        group,
        category,
      },
      create: {
        id,
        group,
        category,
      },
    });
  }
};

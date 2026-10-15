const data = [
  {
    id: 'a0cc3fae-ec36-42bf-9ef2-bc327326f582',
    feature: 'd52a6cce-84b7-4755-8f32-888bdaccc0ec',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // PERMISSION
  {
    id: '3853406c-373d-4655-bc89-2abad64c3aa4',
    feature: '5148df49-8494-4fcc-9edd-1836cc6db30f',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // FEATURE
  {
    id: '4aec613c-e33c-4bb0-add4-57348c8df397',
    feature: '5ce57965-3386-4563-b6ac-12d3427e18ea',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ ONE
          'e227dfb3-2e26-4337-935e-2e361c1d720c', // VALIDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // GUARD
  {
    id: '40ad0b4c-3273-4b9d-a2d5-d2fda0e74a0c',
    feature: 'c90ed865-7d6a-4237-9525-79620dab9157', // ROLE
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // ROLE
  {
    id: '3da4bcfa-6136-46c6-9522-6bfbc5520157',
    feature: '35b307b5-1c2f-4d5d-85ea-b876e583b58a',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          'ee459dba-f0d7-425e-9b20-c1aaeb9ccea4', // TOGGLE ACCESS
        ],
      },
    ],
  }, // SINGULAR
  {
    id: '93bf2a0f-7bba-4095-8b09-f0f55532f3c5',
    feature: '014f41f8-e8f2-4cfc-b784-02e78338d5c4',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ ONE
          '632b05ec-30dd-4478-aa0c-69e3c695311a', // TOGGLE ROLE
          '30e51695-b3c4-4f34-9df2-e09d642d41cb', // TOGGLE BAN
          '30e51695-b3c4-4f34-9df2-e09d642d41cb', // DELETE
        ],
      },
    ],
  }, // USER
  {
    id: '5ee72b8c-5968-41c6-8042-ecedde917f5a',
    feature: 'a7f3c2e1-8b94-4d65-9f21-6c0e5a8b3d72',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          'c896fdcd-f6c5-46cc-aaa5-2ab754e3097c', // READ:PROFILE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
    ],
  }, // USERS
  {
    id: '2921461c-fc9e-4043-8f72-12438b01df71',
    feature: 'b2e8d4f6-1c73-4a95-8e20-7d9f3a6b5c41',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2', // REGISTER
          '4936abd6-f25d-4ef7-9859-2253abe2910a', // LOGIN
          '87cc6766-73ba-488e-b32b-1b48c846b304', // VERIFY:OTP
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2', // VERIFY:TOKEN
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a', // LOGOUT
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2',
          '4936abd6-f25d-4ef7-9859-2253abe2910a',
          '87cc6766-73ba-488e-b32b-1b48c846b304',
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2',
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a',
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2',
          '4936abd6-f25d-4ef7-9859-2253abe2910a',
          '87cc6766-73ba-488e-b32b-1b48c846b304',
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2',
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a',
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2',
          '4936abd6-f25d-4ef7-9859-2253abe2910a',
          '87cc6766-73ba-488e-b32b-1b48c846b304',
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2',
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a',
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2',
          '4936abd6-f25d-4ef7-9859-2253abe2910a',
          '87cc6766-73ba-488e-b32b-1b48c846b304',
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2',
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a',
        ],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '55995abe-005b-4e1f-a5b0-2453414b54e2',
          '4936abd6-f25d-4ef7-9859-2253abe2910a',
          '87cc6766-73ba-488e-b32b-1b48c846b304',
          'aa3f2d66-b2f6-4e06-ab91-9d14b2b793d2',
          '8197d26e-ec30-479a-a044-6ea56dd1ea0a',
        ],
      },
    ],
  }, // AUTH
  {
    id: '8c1602e6-9b55-4fce-9761-f9448756a865',
    feature: '7a5e1c3b-8d62-4f49-b730-3c9a6d4e1f58',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // ADDRESS
  {
    id: '8c1602e6-9b55-4fce-9761-f9448756a865',
    feature: 'c9a1e5b7-3d82-4f64-a710-2e6b8c4d9f53',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          'e489d97b-e900-4978-98d8-68f4c0e08806', // SEARCH
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
        ],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
        ],
      },
    ],
  }, // MEDIA
  {
    id: '90ac1162-1464-4de6-86fd-7326d74dc71b',
    feature: '6f4d9b2a-7c51-4e38-a620-2b8f5c3d9e47',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // STORY
  {
    id: '9ac1c725-5fb4-4f5e-8455-8a078c54d36b',
    feature: 'e5b3d8f1-6c49-4a27-8e00-1d7b4f2a5c36',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          'a07ca38e-dbf2-45a4-a8f2-303b15546201', // UPDATE:STATUS
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
        ],
      },
    ],
  }, // ARTICLE
  {
    id: '9d05eb75-64eb-4134-9d55-43cf65bf5ae9',
    feature: 'c3f1b6d8-4a27-4e95-8c80-8b5f2d9e3a14',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          'a07ca38e-dbf2-45a4-a8f2-303b15546201', // UPDATE:STATUS
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          'a5e0e211-277b-449d-aca0-68d9d2d991b1', // READ:CONNECTION
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'a5e0e211-277b-449d-aca0-68d9d2d991b1',
        ],
      },
      {
        // MODERATOR
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'a5e0e211-277b-449d-aca0-68d9d2d991b1',
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'a5e0e211-277b-449d-aca0-68d9d2d991b1',
        ],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'a5e0e211-277b-449d-aca0-68d9d2d991b1',
        ],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'a5e0e211-277b-449d-aca0-68d9d2d991b1',
        ],
      },
    ],
  }, // COMMENT
  {
    id: '387133b2-16d0-40df-ac82-cc2a3a67a1a6',
    feature: 'd4a2c7e9-5b38-4f16-9d90-9c6a3e1f4b25',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // MENU
  {
    id: 'ec4f2e67-bf15-406c-b753-8719faae5497',
    feature: 'b15d3f8a-9c72-4e40-8a60-4d1b7c5e8f59',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        // USER
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: ['50b4b6b8-7450-474c-9d3c-eadcd7b21a90'],
      },
      {
        // SELLER
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: ['50b4b6b8-7450-474c-9d3c-eadcd7b21a90'],
      },
      {
        // CUSTOMER
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: ['50b4b6b8-7450-474c-9d3c-eadcd7b21a90'],
      },
    ],
  }, // NEWSLETTER
  {
    id: '7b998c66-2068-4740-a1f0-ac76f2783c45',
    feature: 'd4b7f2a9-6e13-4c85-9d20-1a8f5b3e7c64',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
        ],
      },
    ],
  }, // SETTING
  {
    id: 'f8adfbc9-60f2-4d14-a000-ccf9c4c15134',
    feature: 'e1c6a3d8-9f24-4b57-8a10-5d7e2c9b6f43',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ
        ],
      },
    ],
  }, // SMS SETTING
  {
    id: '3b16aa47-42c4-458d-bac5-9aa8fe908c4a',
    feature: 'f5d2b8e4-7a31-4c96-b820-3e6f1a9d5c74',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          'a07ca38e-dbf2-45a4-a8f2-303b15546201', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ
        ],
      },
    ],
  }, // PAYMENT SETTING
  {
    id: 'b6906c69-522f-4632-bbfe-82f634a1c84f',
    feature: '1a8e4c6b-2d95-4f73-9b10-6c3e7a5d8f42',
    data: [
      {
        // ADMIN
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
        ],
      },
      {
        // MANAGER
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
        ],
      },
    ],
  }, // SMS
  {
    id: 'f4ac3381-7bd5-4ce7-81c7-12e8b75a36a5',
    feature: '3c1a6e8d-4f27-4b95-a310-8e5d2c7f9b64',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
        ],
      },
    ],
  }, // STORE
  {
    id: '78ce4324-3b8d-4b69-bd20-77aee393f2e7',
    feature: '5e3c8a1f-6b49-4d27-9c50-1a7f4e2b8d36',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
          '7f4e5594-d6e2-4ee9-a40c-9792f8796d9c',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
          '7f4e5594-d6e2-4ee9-a40c-9792f8796d9c',
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          'a07ca38e-dbf2-45a4-a8f2-303b15546201',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          '7f4e5594-d6e2-4ee9-a40c-9792f8796d9c',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // PRODUCT
  {
    id: 'b96a15c9-4240-429b-b91b-a911d044684d',
    feature: '4d2b7f9e-5a38-4c16-8b40-9f6e3d1a7c25',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // SPECIFICATION
  {
    id: '08a093e9-ec73-4dc2-8eab-e3e2342a5922',
    feature: '9c7a3e5d-1f84-4b62-9d50-5e2c8f6a3b71',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // CATEGORY
  {
    id: 'b6d0355d-dd25-4528-b55d-b359b240aaca',
    feature: 'a1d8f4b6-2e95-4c73-8a60-6f3d9b7e1c82',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // CATEGORY:SUB
  {
    id: 'e88dcdcc-7d15-4b45-aa93-761149e35b93',
    feature: 'b2e9a5c7-3f16-4d84-9b70-7a4e1c8d2f93',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // ATTRIBUTE
  {
    id: '2abb8f25-c216-48c2-b506-a9862692a20e',
    feature: '6c0e8a3b-4d27-4f95-a170-8e5c2d9f3b04',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // BRAND
  {
    id: '2b15e3dc-da43-4f2b-b36c-d8619928bb66',
    feature: 'a04c2e7f-8b61-4d39-9e50-3c9f6b4a7d48',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'e489d97b-e900-4978-98d8-68f4c0e08806',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // COLOR
  {
    id: '159f8577-9a72-4ab4-9ec6-e9ef92a0e025',
    feature: '39f7b3d5-1a84-4e62-9c40-5b2f8d6a1e70',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // FILTER
  {
    id: 'eadc3a44-003d-4346-95d0-ca5273b873d3',
    feature: '4a8c6e1f-2b95-4f73-8d50-6c3a9e7b1f82',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
        ],
      },
    ],
  }, // SEARCH
  {
    id: 'ed387d15-71e9-47fb-9288-93bde3cd1a64',
    feature: 'f6c4e9a2-7d51-4b38-9f10-2e8c5a3b6d47',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          'UUID_PERMISSION_EMPTY', // EMPTY - جایگزین با UUID واقعی
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'UUID_PERMISSION_EMPTY',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          'UUID_PERMISSION_EMPTY',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // CART
  {
    id: '6e6cc423-13d1-44b9-a5ce-d902856ad36a',
    feature: '17d5f1b3-8e62-4c49-a020-3f9d6b4a7e58',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '8bf28016-1499-416f-a51e-3e8155fc43fe',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
        ],
      },
    ],
  }, // ORDER
  {
    id: '25e954f4-889f-45b0-908b-5b9dfe3a3112',
    feature: '2b9f5d7c-3e16-4a84-8c20-7d4f1b6e9a53',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '353000a7-8c34-4f17-9de1-48d73d447d2b', // PAYMENT
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '353000a7-8c34-4f17-9de1-48d73d447d2b',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '353000a7-8c34-4f17-9de1-48d73d447d2b',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: [
          '353000a7-8c34-4f17-9de1-48d73d447d2b',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // PAYMENT
  {
    id: '62a97a00-90b4-45fb-a53c-3abedbae148c',
    feature: 'c26e4a9b-1d83-4f51-9b70-5e2c8d6a3f60',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
          'a402a508-d79a-417b-88c0-634395660da3', // READ:SECTION
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90',
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '3b2c739e-3d88-4141-8888-f1f5cf67488d',
          'a402a508-d79a-417b-88c0-634395660da3',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb',
          '496c5edb-8f59-4030-9b45-91e1f7a926d4',
        ],
      },
    ],
  }, // SALE
  {
    id: '7527fa0a-a86d-44b1-88bc-7ea0bd576d0f',
    feature: '8b6f2d4c-9e73-4a51-8c40-4d1b7e5f2a69',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000',
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        permissions: ['5e368af2-d334-4139-81e1-e76fc97a8bcb'],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d',
        permissions: ['5e368af2-d334-4139-81e1-e76fc97a8bcb'],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d',
        permissions: ['5e368af2-d334-4139-81e1-e76fc97a8bcb'],
      },
    ],
  }, // WALLET
  {
    id: '6ef5af8c-be59-4ac3-807e-fe387d320730',
    feature: '28e6a2c4-9f73-4d51-8b30-4a1e7c5d9f69',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '2a7b6c2d-ed1d-45fb-aba5-f9fae0a75ecd', // TOGGLE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7', // MANAGER
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '2a7b6c2d-ed1d-45fb-aba5-f9fae0a75ecd', // TOGGLE
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8', // USER
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '2a7b6c2d-ed1d-45fb-aba5-f9fae0a75ecd', // TOGGLE
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d', // CUSTOMER
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '2a7b6c2d-ed1d-45fb-aba5-f9fae0a75ecd', // TOGGLE
        ],
      },
    ],
  }, // LIKE
  {
    id: '2d74ee5c-dbfc-4e1b-805b-7f59f9da1a0a',
    feature: '9f3b1d6e-7a50-4c28-8d40-2b8f5a3c6e37',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7', // MANAGER
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8', // USER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d', // CUSTOMER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // WISHLIST
  {
    id: '5c0da4d0-72f0-4569-83c5-1d0369dd7cc9',
    feature: '5b9d7f2a-3c16-4a84-9e60-7d4b1f8c2a93',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7', // MANAGER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '3f2504e0-4f89-41d3-9a0c-0305e82c3301', // MODERATOR
        permissions: [
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        role: '6ba7b810-9dad-41d1-80b4-00c04fd430c8', // USER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        role: '9f8b7d6c-5e4f-4a3b-9c2d-1e0f8a7b6c5d', // SELLER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
      {
        role: '1b2c3d4e-5f6a-47b8-9c0d-1e2f3a4b5c6d', // CUSTOMER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
        ],
      },
    ],
  }, // TICKET
  {
    id: '6e4c3a66-1f0b-41a3-89a9-19a80f19f468',
    feature: '7d1f9b4c-5e38-4a06-8b20-9f6d3e1a4c15',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7', // MANAGER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // TARGET
  {
    id: '81fa0acf-9b02-4793-b731-2bdbd3ff50b4',
    feature: '8e2a0c5d-6f49-4b17-9c30-1a7e4f2b5d26',
    data: [
      {
        role: '550e8400-e29b-41d4-a716-446655440000', // ADMIN
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
      {
        role: '7c9e6679-7425-40de-944b-e07fc1f90ae7', // MANAGER
        permissions: [
          '50b4b6b8-7450-474c-9d3c-eadcd7b21a90', // CREATE
          '5e368af2-d334-4139-81e1-e76fc97a8bcb', // READ
          '496c5edb-8f59-4030-9b45-91e1f7a926d4', // READ:ONE
          '8bf28016-1499-416f-a51e-3e8155fc43fe', // UPDATE
          '3b2c739e-3d88-4141-8888-f1f5cf67488d', // DELETE
        ],
      },
    ],
  }, // REPORT
];

export default data;

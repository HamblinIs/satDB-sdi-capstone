
await knex('user_account').insert([
    {
      "name": "John Doe",
      "address": "1234 Elm St, Springfield, IL",
      "email": "johndoe@example.com",
      "username": "johndoe123",
      "password": "Password123"
  },
  {
      "name": "Alice Smith",
      "address": "5678 Maple St, Anytown, CA",
      "email": "alice.smith@example.com",
      "username": "asmith",
      "password": "SecurePwd456"
  },
  {
      "name": "Bob Johnson",
      "address": "91011 Oak St, Metropolis, NY",
      "email": "bobjohnson@example.com",
      "username": "bobj",
      "password": "MyPwd789"
  },
  {
      "name": "Emily Brown",
      "address": "121314 Pine St, Smallville, TX",
      "email": "emily.brown@example.com",
      "username": "ebrown",
      "password": "Brownie456"
  },
  {
      "name": "Michael Wilson",
      "address": "151617 Cedar St, Rivertown, FL",
      "email": "michael.wilson@example.com",
      "username": "mwilson",
      "password": "Wilson123!"
  },
  {
      "name": "Sarah Taylor",
      "address": "181920 Walnut St, Lakeside, WA",
      "email": "sarah.taylor@example.com",
      "username": "stayl",
      "password": "TaylorPwd789"
  },
  {
      "name": "Chris Martinez",
      "address": "212223 Birch St, Hill Valley, CA",
      "email": "chris.martinez@example.com",
      "username": "cmartinez",
      "password": "WelcomeCM456"
  },
  {
      "name": "Linda Clark",
      "address": "242526 Maple St, Greenvale, NC",
      "email": "linda.clark@example.com",
      "username": "lclark",
      "password": "ClarkPwd2023"
  },
  {
      "name": "David Baker",
      "address": "272829 Oak St, Sunnydale, AZ",
      "email": "david.baker@example.com",
      "username": "dbaker",
      "password": "Baker@2024"
  },
  {
      "name": "Emma Thompson",
      "address": "303132 Pine St, Lakeside, NV",
      "email": "emma.thompson@example.com",
      "username": "ethompson",
      "password": "ThompsonPwd567"
  }
  ]);
};
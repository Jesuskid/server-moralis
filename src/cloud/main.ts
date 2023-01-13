/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';

Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});


Parse.Cloud.define('fecthFollowers', async (request: any) => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  const list = request.params.userList
  const User = Parse.Object.extend("User")
  const query = new Parse.Query(User)
  query.containedIn('objectId', list)
  query.includeAll()
  const result = await query.find({ useMasterKey: true })
  const new_list: any = []
  result.map((object: any) => {
    new_list.push({
      'image': object.get('profile_image'),
      'name': object.get('username'),
      'id': object.id
    })

  })
  return new_list;
});


Parse.Cloud.define('fetchUserUnAuth', async (request: any) => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  const id = request.params.id
  const User = Parse.Object.extend("User")
  const query = new Parse.Query(User)
  query.equalTo('objectId', id)
  const result = await query.find({ useMasterKey: true })
  const new_list: any = []
  result.map((object: any) => {
    new_list.push({
      'image': object.get('profile_image'),
      'name': object.get('username'),
      'id': object.id,
      'ethAddress': object.get('ethAddress')
    })

  })
  return new_list;
});

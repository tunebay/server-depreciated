const track = {
  name: 'Drive',
  duration: 191,
  playlistPosition: 1,
  isASingle: true,
  price: '0.79',
  fileType: 'audio/wav',
  location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/f096ab60-e56b-44d7-abd0-6356e9b08205'
};

const tracks = [
  { name: 'Drive',
    duration: 191,
    playlistPosition: 1,
    isASingle: true,
    price: '0.79',
    fileType: 'audio/wav',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/f096ab60-e56b-44d7-abd0-6356e9b08205' },
  { name: '2 Can Play At That Game',
    duration: 213,
    playlistPosition: 2,
    isASingle: false,
    price: null,
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/e9ebcd3e-0cf2-43c1-950f-9dc280632f1d' },
  { name: 'Alchemy',
    duration: 227,
    playlistPosition: 3,
    isASingle: true,
    price: '0.79',
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/0ea4b041-222f-41bf-a30a-f4ed45e0aec7' },
  { name: 'Another Man',
    duration: 234,
    playlistPosition: 4,
    isASingle: false,
    price: null,
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/4ae6bf66-9c83-4633-aa3f-dd9852859b5d' },
  { name: 'Hans Melody',
    duration: 61,
    playlistPosition: 5,
    isASingle: false,
    price: null,
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/e0589e43-624a-4650-ac37-52203abdf555' },
  { name: '(What Have I Got To Do) Now You\'re Gone',
    duration: 216,
    playlistPosition: 6,
    isASingle: false,
    price: null,
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/930df7a2-28f6-4327-b6a8-c7739856a360' },
  { name: 'Is This Love',
    duration: 245,
    playlistPosition: 7,
    isASingle: false,
    price: null,
    fileType: 'audio/mp3',
    location: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/2549b3c6-f01a-415c-bdbc-3d187fc9e7d4' }
];

const playlist = {
  tracks,
  title: 'Alchemy',
  playlistType: 'album',
  price: '7.99',
  canPayMore: true,
  numberOfTracks: 7,
  lengthInSeconds: 1387,
  genre1Id: 34,
  genre2Id: 14,
  genre3Id: null,
  releaseDate: '21/03/2017',
  description: 'All songs written and produced by Mali Michael and Gibbi Bettini',
  purchaseMessage: 'Thanks for the support.'
};

module.exports = { tracks, track, playlist };

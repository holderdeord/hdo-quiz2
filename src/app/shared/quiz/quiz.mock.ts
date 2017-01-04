export function mockManuscriptData(name: string) {
  return require(`../../../assets/mock-data/manuscript-${name}.json`);
}


export function mockStackData() {
  return [
    {
      'id': 1,
      'name': 'Parti',
      'promises': [
        {
          'body': 'Holdt',
          'kept': true
        },
        {
          'body': 'Ikke holdt',
          'kept': false
        }
      ]
    }
  ];
}

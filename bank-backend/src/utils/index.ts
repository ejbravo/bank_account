const trimCardId = (cardId: string) => {
  const cardIdArray = cardId.split('');
  const trimmedCardId = cardIdArray.map((chart, index) => {
    if (index < 12) return '*';
    else return chart;
  });

  return trimmedCardId.join('');
};

export { trimCardId };

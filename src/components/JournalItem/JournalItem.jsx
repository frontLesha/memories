import './JournalItem.css';

function JournalItem(props) {
  const date = Intl.DateTimeFormat('ru-RU').format(props.data.date);

  return (
    <>
      <h2 className="journal-item__header">{props.data.title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{date}</div>
        <div className="journal-item__text">{props.data.text}</div>
      </h2>
    </>
  );
}

export default JournalItem;

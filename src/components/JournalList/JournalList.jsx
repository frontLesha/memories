import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList(props) {

  if (props.items.length === 0) {
    return (
      <>
      <h3>No memories, write first!</h3>
      </>
    )
  }

  const sortItems = (a, b) => {
    if (a.date > b.date) {
      return 1
    }
    return -1 
  }

  return (
    <div className='journal-list'>
      {
        props.items.sort(sortItems).map(el => (
          <CardButton key={el.id}>
             <JournalItem data={el}/>
          </CardButton>
        ))
      }
    </div>
  )
}

export default JournalList;

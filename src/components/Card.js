function Card ({card, onCardClick, onConfirmDelete}) {

   function handleClick() {  
        onCardClick(card);
      } 

     function confirmDeleteCard() {
        onConfirmDelete(card)
     }
   
    return(
        <li className="grid__list">
                <button className="grid__delete-button" type="button" aria-label="Удалить" onClick={confirmDeleteCard}></button>
                <article className="grid__element">
                    <img className="grid__image" src={card.link} alt={card.name} onMouseDown={handleClick}/>
                    <div className="grid__container">
                        <h2 className="grid__title">{card.name}</h2>
                        <div className="grid__like-container">
                            <button className="grid__like-button" type="button" aria-label="Мне нравится">
                            </button>
                            <p className="griid__counter">{card.likes.length}</p>
                        </div>
                    </div>
                </article>
            </li>
    )
}
export default Card;
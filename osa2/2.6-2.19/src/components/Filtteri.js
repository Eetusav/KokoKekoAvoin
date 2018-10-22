import React from "react"

 const Filtteri = ({ filtteri, handleFilterChange }) => {
    return (
        <form>
            <div>
                rajaa näytettäviä: <input value={filtteri} onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default Filtteri;
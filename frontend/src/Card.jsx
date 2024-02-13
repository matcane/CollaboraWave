import React, { useState } from 'react';

function Card () {
    return(
        <div className="card">

                <div id="top" onClick={() => console.log("aha")}>🔼</div>
                <div id="card-text"><p>hagsjdaakjhsdaskdjasdasdasdasdasdasdasdasdasdasdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddsasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddskadjfhsdakfjshdfdskjfshdfkh</p></div>
                <div id="bottom">🔽</div>

            
        </div>
    )
}

export default Card
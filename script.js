document.addEventListener('DOMContentLoaded' , () => {

    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay =  document.querySelector('#result')
    const width = 4
    let squares = []
    let score = 0 
    //create the playing board
    function createBoard(){
        for(let i = 0 ; i < width*width ; i++ ){
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
            console.log(squares)
        }
        generate()
        generate()
    }
    createBoard()

    //generate a new number
    function generate(){
        const randomNumber = Math.floor(Math.random() * squares.length)
        console.log(randomNumber)
        if(squares[randomNumber].innerHTML == 0 ){
            squares[randomNumber].innerHTML = 2
            //check for game over 
        }
        else generate()
    }

    function moveRight(){
        for(let i=0 ; i<16 ; i++){
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne) , parseInt(totalTwo) , parseInt(totalThree) , parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

                
            }
        }
    }
    
    // assign function to keys
    function control(e){
        if (e.key === 'ArrowLeft'){
            // KeyLeft()
        }
        else if(e.key === 'ArrowRight'){
            KeyRight()
        }
    } 
    
    document.addEventListener('keydown' , control)

    // function KeyLeft(){
    //     moverLeft()
    //     combineRow()
    //     moveLeft()
    //     generate()
    // }

    function KeyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function combineRow(){
        for(let i=0 ; i<15 ; i++){
            if(squares[i].innerHTML===squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML=combinedTotal
                squares[i+1].innerHTML = 0 
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        //check for win
    }
})
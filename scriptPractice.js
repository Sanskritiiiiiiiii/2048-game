document.addEventListener('DOMContentLoaded' , function(){
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay =  document.querySelector('#result')
    const gridDisplay = document.querySelector('.grid')
    let squares = []
    const width = 4 
    let score = 0

    function gridFormattion(){
        for(let i=0 ; i<width*width ; i++){
        const square = document.createElement('div')
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(square)
        console.log(squares)
        }
        generate()
        generate()
    }
    gridFormattion()

    function generate(){
        const randomNumber = Math.floor(Math.random()*squares.length)
        if(squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML =2
        }
        else{[
            generate()
        ]}
    }

    function moveRight(){
        for(let i=0 ; i<16 ; i++){
            if( i%4 === 0){
                let first = squares[i].innerHTML
                let second = squares[i+1].innerHTML
                let third = squares[i+2].innerHTML
                let fourth = squares[i+3].innerHTML

                let row = [parseInt(first) , parseInt(second ), parseInt(third), parseInt(fourth)]
                let filteredRow = row.filter(num=>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }
    }

    //Provide function to keys
    function control(e){
        if(e.key === 'ArrowLeft'){
            keyLeft()
        }
        else if(e.key === 'ArrowRight') {
            keyRight()
        }
        else if(e.key === 'ArrowDown'){
            keyDown()
        }
        else if(e.key === 'ArrowUp'){
            keyUp()
        }
            
        
    }

    function keyLeft(){
        for(let i=0 ; i<15 ; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML ){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i+1].innerHTML = combinedTotal
                squares[i].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
    }

    document.addEventListener('keydown' ,control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }
    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function combineRow(){
        for(let i=0 ; i<15 ; i++){
            if(squares[i].innerHTML===squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn(){
        for(let i=0 ; i<12 ; i++){
            if(squares[i].innerHTML===squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function moveLeft(){
        for(let i=0 ; i<squares.length ; i++){
            if(i%4==0){
                 
                let first = squares[i].innerHTML
                let second = squares[i+1].innerHTML
                let third = squares[i+2].innerHTML
                let fourth = squares[i+3].innerHTML

                let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth),]
                let filteredRow = row.filter(num=>num)
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeroes)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
            
        }
    }

    //Move Up
    function moveUp(){
        for(let i=0 ; i<4 ; i++){
                let first = squares[i].innerHTML
                let fourth = squares[i+(width)].innerHTML
                let second = squares[i+(width*2)].innerHTML
                let third = squares[i+(width*3)].innerHTML

                let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth),]
                let filteredColumn = column.filter(num=>num)
                let missing = 4 - filteredColumn.length
                let zeroes = Array(missing).fill(0)
                let newColumn = filteredColumn.concat(zeroes)

                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+(width*2)].innerHTML = newColumn[2]
                squares[i+(width*3)].innerHTML = newColumn[3]
            }
        }

            //Move Down
    function moveDown(){
        for(let i=0 ; i<4 ; i++){
                let first = squares[i].innerHTML
                let fourth = squares[i+(width)].innerHTML
                let second = squares[i+(width*2)].innerHTML
                let third = squares[i+(width*3)].innerHTML

                let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth),]
                let filteredColumn = column.filter(num=>num)
                let missing = 4 - filteredColumn.length
                let zeroes = Array(missing).fill(0)
                let newColumn = zeroes.concat(filteredColumn)

                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+(width*2)].innerHTML = newColumn[2]
                squares[i+(width*3)].innerHTML = newColumn[3]
            }
        }


        //check for for the number 2048 in the squares to win
        function checkForWin(){
            for(let i=0 ; i<squares.length ; i++){
                if(squares[i].innerHTML ==2048){
                    resultDisplay.innerHTML = 'You Win'              
                    document.removeEventListener('keydown', control)
            }
        }
    }

        //check if there are no zeros on the board to lose
        function checkForGameOver(){
            let zeros = 0
            for(let i =0 ; i<squares.length ; i++){
                if(squares[i].innerHTML == 0 ){
                    zeros++
                }
            }
            if(zeros === 0 ){
                resultDisplay.innerHTML = "You Lose"
                document.removeEventListener('keydown', control)
            }
        }

        // // add colors 
        // function addColours(){
        //     for(let i=0 ; i<squares.length ; i++){
        //         if(if (parseInt(squares[i].innerHTML) === 0)  ) {
        //             squares[i].style.backgroundColor = '#afa192'
        //         }
        //         else if(squares[i].innerHTML ==2){
        //             squares[i].style.backgroundColor = '#eee4da'
        //         }
        //         else if(squares[i].innerHTML ==4){
        //             squares[i].style.backgroundColor = '#ede0c8'
        //         }
        //         else if(squares[i].innerHTML ==8){
        //             squares[i].style.backgroundColor = '#f2b179'
        //         }
        //         else if(squares[i].innerHTML ==16){
        //             squares[i].style.backgroundColor = '#ffcea4'
        //         }
        //         else if(squares[i].innerHTML ==32){
        //             squares[i].style.backgroundColor = '#e8c064'
        //         }
        //         else if(squares[i].innerHTML ==64){
        //             squares[i].style.backgroundColor = '#ffab6e'
        //         }
        //         else if(squares[i].innerHTML ==128){
        //             squares[i].style.backgroundColor = '#fd9982'
        //         }
        //         else if(squares[i].innerHTML ==256){
        //             squares[i].style.backgroundColor = '#ead79c'
        //         }
        //         else if(squares[i].innerHTML ==512){
        //             squares[i].style.backgroundColor = '#76daff'
        //         }
        //         else if(squares[i].innerHTML ==1024){
        //             squares[i].style.backgroundColor = '#beeaa5'
        //         }
        //         else if(squares[i].innerHTML ==2048){
        //             squares[i].style.backgroundColor = '#ad7d4f0'
        //         }
                                
        //     }
        // }
        // addColours()

        // let myTimer = setInterval(addColours,200)

        function addColours() {
            for (let i = 0; i < squares.length; i++) {
                let value = parseInt(squares[i].innerHTML)  // Convert to number
                
                if (value === 0) squares[i].style.backgroundColor = '#afa192'
                else if (value === 2) squares[i].style.backgroundColor = '#eee4da'
                else if (value === 4) squares[i].style.backgroundColor = '#ede0c8'
                else if (value === 8) squares[i].style.backgroundColor = '#f2b179'
                else if (value === 16) squares[i].style.backgroundColor = '#ffcea4'
                else if (value === 32) squares[i].style.backgroundColor = '#e8c064'
                else if (value === 64) squares[i].style.backgroundColor = '#ffab6e'
                else if (value === 128) squares[i].style.backgroundColor = '#fd9982'
                else if (value === 256) squares[i].style.backgroundColor = '#ead79c'
                else if (value === 512) squares[i].style.backgroundColor = '#76daff'
                else if (value === 1024) squares[i].style.backgroundColor = '#beeaa5'
                else if (value === 2048) squares[i].style.backgroundColor = '#ad7d4f'
            }
        }
        
        addColours()
        
        let myTimer = setInterval(addColours, 50)  // Runs every 200ms for better performance
        
    
})

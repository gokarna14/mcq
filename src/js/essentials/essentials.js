export const dummyList = [1, 2, 3, 4, 5, 6, 7, 8].map(
    (i)=>{
      return(
        <>
          {i}. The quick brown fox ran over the lazy dog.
          <br />
        </>
      )
    }
  )

  export const replacer = {
    '!@#': ',',
    
  }

  export const shuffle =(array)=> {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export const benefitsOfLogIn=(
  <>
    <h1>Benefits of login</h1>
    <p>ll</p>
    <p>In essentials</p>
  </>
)

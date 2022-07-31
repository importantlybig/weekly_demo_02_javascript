class Github {
  
    async getUser(user) {
      try {
        const profileResponse = await fetch(
          `https://api.github.com/users/${user}`
        );
    
        const repoResponse = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
    

    
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
    
        return {
          profile,
          repos
        };
      } catch (error) {
        console.log(`Error in fetching data: ${error}`)
      }
    }
  }
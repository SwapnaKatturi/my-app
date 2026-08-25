/**
 * EXERCISE 17 (function components) — prop drilling
 * -----------------------------------------------------------
 * Expected behavior: shows "Hello Swapna!" at the bottom of a 3-level-deep
 * component tree.
 *
 * Bug: shows "Hello !" instead. `username` is spelled correctly
 * everywhere — nobody mistyped a prop name this time (that was Ex13).
 * The prop just needs to be forwarded through EVERY level to reach the
 * bottom — check each component along the way.
 */

import { createContext, useContext } from "react";


function Level3({ username }: { username?: string }) {
    return <p>Hello {username}!</p>
}

//missed username here to pass it to next level
function Level2({ username }: { username?: string }) {
    return <Level3 username={username} />;
}

function Level1({ username }: { username: string }) {
    return <Level2 username={username} />
}

// function PropDrillingDemo() {
//     return (
//         <div className="exercise">
//             <h3>Ex17: Prop Drilling </h3>
//             <Level1 username="Swapna" />
//         </div>
//     )
// }

// export default PropDrillingDemo;

/* 
* Replacing propdrillling with createContext
*/

const UsernameContext = createContext<string | undefined>(undefined);

function LevelContext3() {
    const username = useContext(UsernameContext);
    return <p>Hello {username}!</p>
}

function LevelContext2() {
    return <LevelContext3 />
}

function LevelContext1() {
    return <LevelContext2 />

}


function PropDrillingDemo() {
    return (
        <div className="exercise">
            <h3>Ex17 using useContext</h3>
            <UsernameContext.Provider value="Swapna">
                <LevelContext1 />
            </UsernameContext.Provider>

        </div>
    )
}

export default PropDrillingDemo;
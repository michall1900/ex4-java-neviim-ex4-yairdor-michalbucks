[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7Tmn2VQK)

# Authors
* Name: Yair Dor Email: yairdo@edu.hac.ac.il Id: 318169505
* Name: Michal Bucks Email: michalbu@edu.hac.ac.il Id: 205980725

# Explanations

<h2> Important: </h2>
<div>
    We used 3 extra days (and not suppose to lose points because of that). 
</div>
<div>
    We have load more button in search pages.
</div>
<div>
    Important: a valid tmdbItem's id is key with this pattern: "/^(Movies\.|Series\.)\d+$/"
</div>

<h3>Valid routes</h3>
<ul>
    <li>
        /api/purchase: There are 2 available methods:
        <ul>
            <li>
                post - Receives purchase object (firstName — string with 0 &lt; length &lt;=30,
                lastName - string with 0 &lt; length &lt;=30, and email -string with 0 &lt; length &lt;=30), and a set of ids
                that the user is updated with (id is a string in this case). The json should look like that
                {purchase:{firstName:___, lastName:___, email:___} ids:[&lt;id1;&gt;, &lt;id2&gt;,....]}.
                If there is an error - the cart is empty/ the ids are not the same as in the cart, return
                HttpStatus.BAD_REQUEST error description.
            </li>
            <li>
                get - Return all the purchases in the database.
            </li>
        </ul>
    </li>
    <li>
        /api/cart: There are multiple available methods:
        <ul>
            <li>
                post - receives tmdb item with the parameters: id, date, name, posterPath, popularity,and overview
                when id - required, and date - in yyyy-mm-dd format if exists. Returns ResponseEntity.ok(newItem).
                If id or date are invalid, return HttpStatus.BAD_REQUEST with the relevant errors.
            </li>
            <li>
                get- return all the cart's items (A map when the key is the item's id and the value is the item
                itself).
            </li>
            <li>
                delete - delete all the cart. Could throw HttpStatus.BAD_REQUEST if the cart is already empty.
            </li>
        </ul>
    </li>
    <li>
        /api/cart/counter : A get request that returns the number of items in the cart.
    </li>
    <li>
        /api/cart/item/{id} : A delete request that delete the wanted item's id. Throw HttpStatus.BAD_REQUEST
        if the item is not existed.
    </li>
</ul>


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).

## Still have problems? Come to class.

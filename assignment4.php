<?php       
    $page_title = 'Assignment 4 - PixiJS';
    $PAGE='Assignment 4';
	$page_css = 'includes/assign4.css';
    require 'includes/header.php';
?>	  


        <div id="contentDiv" class="container">
			
			<main>
				<h1>Hello Kitty Kat!</h1>
				<p>A very basic "game" created using PixiJS</p>
				<button id="btnByeKittyKat" onclick="gameLoopMoveKittyKat()">Bye Kitty Kat!</button>
				<button id="btnComeBackKittyKat" onclick="gameLoopBringKittyKatBack()">Stop Kitty Kat! Come Back!</button>
				<br><br>
				<div id="kat"></div>
				<br>
				<div class="wrapper2">
				<h2>*Note:* </h2>
				<p>Click 'Stop Kitty Kat! Come Back!'<b> twice </b>to stop him and bring him back (even if he's already left).
				<br>He's a very stubborn Kitty Kat!</p>
				</div>
			</main>
		</div>
			<aside id="mynewsfeed" class="sidebar">
				<h2> A Playlist </h2>
				<iframe src="https://open.spotify.com/embed/user/1237657570/playlist/0tnnf548YZPUCqhzKZfH4a"></iframe>
				<br>
				<p>With some explicit songs...<small>yikes!<small></p>
			</aside>		
		
		
  
        
    </div> 

  </body>
  <?php
	require 'includes/footer.php';
  ?>
  
    <script src="includes/pixi.min.js"></script>
	<script src="includes/assignment4.js"></script>
  
  
  
</html>
# Hangman Game

import random

words = ['apple', banana', "orange’, 'watermelon’, 
‘pineapple’,’grapefruit'. ‘kiwi’,’pear']
word = random.choice (words)
allowed_guesses = 6
guessed_letters = []

print ("Welcome to Hangman! ")
print (f"The word has (len (word) letters.")
print ("You have 6 guesses to figure out the word.")

while allowed guesses > 0:
	guesses_left = allowed_guesses - len([x for x in 
  guessed_letters if x not in word])
	if guesses_left == 0:
	print ("You ran out of guesses! The word was", word)
	break

print (f"You have (guesses_left) guesses left.")
guess = input ("Enter a letter:").lower ()

if guess in guessed_letters:
	print ("You already guessed that letter.")
	continue

guessed letters.append (guess)

if guess in word:
	print ("Correct!")
else:
	allowed_guesses -= 1
	print ("Incorrect.")

word progress = “”.join([letter if letter 
in guessed_letters else "_" for letter in word])
	print (word progress)

if word_progress == word:
	print ("Congratulations! You guessed the word!")
#Hacking version 7
# This is a graphical password guessing game that displays a 
# list of potential computer passwords. The player is allowed 
# 1 attempt to guess the password. The game indicates whether 
# the player successfully guessed the password or not.
#creates embedded passwords and displays a hint if guess is incorrect
#selects a random password from password_list as the correct one

from uagame import Window
from time import sleep
from random import randint, choice

def main():
    location = [0, 0]
    attempts = 4
    window = create_window()
    display_header(window, location, attempts)
    password = display_password_list(window, location)
    guess = get_guesses(window, password, location, attempts)
    end_game(window, guess, password)
    window.close()


def create_window():
    # Create a window for the game, open it and return it
    
    window = Window('Hacking', 600, 500)
    window.set_font_name('couriernew')
    window.set_font_size(18)
    window.set_font_color('green')
    window.set_bg_color('black')
    return window
    
def display_header(window, location, attempts):
    # Display the game header
        # - window is the Window to display in
        # - location is a list containing the int x and y coords of
        # where the header should be displayed and it should be
        # updated for the next output
        # - attempts is the number of guesses allowed
    
    header = ['DEBUG MODE', str(attempts) + ' ATTEMPT(S) LEFT', '']
    for header_line in header:
        display_line(window, header_line, location)
        
        
def display_line(window, string, location):
    #Display a string in the window and update the location
    # - window is the window to display in
    # - string is the str to display in
    # - location is a tuple containing the int x and int y coords
    #of where the string should be displayed and it should be
    #updated to one "line" below the top left corner of the
    #displayed string
    pause_time = 0.3
    string_height = window.get_font_height()
    window.draw_string(string, location[0], location[1])
    window.update()
    sleep(pause_time)
    location[1] = location[1] + string_height
    
def display_password_list(window, location):
    # Display the game passwords, update the location for the next
    # text and return the correct password
    # - window is the Window to display in
    # - location is a list containing the int x and y coords of
    # where the first password should be displayed and it should
    # be updated for the next output
    
    password_list = ['PROVIDE', 'SETTING', 'CANTINA', 'CUTTING', 'HUNTERS', 'SURVIVE',  'HEARING', 'HUNTING', 'REALIZE', 'NOTHING', 'OVERLAP', 'FINDING', 'PUTTING',]
    for password in password_list:
        password = embed_password(password, 20)
        display_line(window, password, location)
    display_line(window, '', location)
        
    #choose password
    password_range = range(13)
    correct_password = choice(password_range)
    return password_list[correct_password]
        
def get_guesses(window, password, location, attempts_left):
    # Input multiple guesses by the player and provide feedback.
    # Return the player's final guess.
    # - window is the Window to display in
    # - password is the str correct password
    # - location is a list containing the int x and y coords of
    # where the first password prompt should be displayed
    # - attempts_left is the number of guesses left    

    prompt = 'ENTER PASSWORD >'
    line_x = 0
    guess = prompt_user(window, prompt, location)
    hint_location = [window.get_width()/2, 0]
    
    #   decrement attempts left
    attempts_left = attempts_left - 1    
    while guess != password and attempts_left > 0:
        window.draw_string(str(attempts_left), line_x, window.get_font_height())
        check_warning(window, attempts_left)
        display_hint(window, password, guess, hint_location)
        location[1] = location[1] + window.get_font_height()
        guess = prompt_user(window, prompt, location)
        attempts_left = attempts_left - 1
    return guess
    

def end_game(window, guess, password):
    # End the game by displaying the outcome and prompting for
        # an enter.
        # - window is the Window to display in
        # - guess is the player's guess str
        # - password is the correct password string
        # - pause_time is the number of seconds to pause after displaying
        # each result line
    
    window.clear()
    #   create outcome
    if guess == password:
        # create success
        outcome = [guess, '', 'EXITING DEBUG MODE', '', 'LOGIN SUCCESSFUL - WELCOME BACK', '']
        prompt = 'PRESS ENTER TO CONTINUE'
    else:
        # create failure
        outcome = [guess, '', 'LOGIN FAILURE - TERMINAL LOCKED', '','PLEASE CONTACT AN ADMINISTRATOR', '']
        prompt = 'PRESS ENTER TO EXIT'
    location = display_outcome(window, outcome)
        
    #prompt for end
    x_space = window.get_width() - window.get_string_width(prompt)
    location[0] = x_space // 2    
    user_input = prompt_user(window, prompt, location)

def prompt_user(window, prompt, location):
    # Draw a prompt, input a string that the user types and
        # return the string
        # - window is the Window to display in
        # - prompt is the str to display
        # - location is a list containing the int x and int y coords
        # of where the prompt should be displayed and it should be
        # updated to one "line" below the top left corner of the
        # displayed prompt
    
    user_input = window.input_string(prompt, location[0], location[1])
    return user_input

def check_warning(window, attempts_left):
    # Check whether a lockout warning should be displayed and if so,
        # display it
        # - window is the Window to display in
        # - attempts_left is the number of guesses left
    
    if attempts_left == 1:
    #                   display warning
        warning = '*** LOCKOUT WARNING ***'
        wline_y = window.get_height() - window.get_font_height()
        wline_x = window.get_width() - window.get_string_width(warning)
        window.draw_string(warning, wline_x, wline_y)
    
def display_outcome(window, outcome):
    # Display the outcome of the game: success or failure depending
        # on whether the guess equals the password or not. Return
        # the location of the line below the outcome.
        # - window is the Window to display in
        # - guess is the player's guess str
        # - password is the correct password string
        # - pause_time is the number of seconds to pause after displaying
        # each result line
    
        #compute y coordinate
    location = [0, 0]
    outcome_height = (len(outcome) + 1)*window.get_font_height()
    y_space = window.get_height() - outcome_height
    location[1] = y_space // 2   
    
    for outcome_line in outcome:
        # display centered outcome line
        #    compute x coordinate
        x_space = window.get_width() - window.get_string_width(outcome_line)
        location[0] = x_space // 2    
        display_line(window, outcome_line, location)    
    return location

def embed_password(password, size):
    #return a fixed length string with the password embedded
    #somewhere in the string and padded with symbol characters
    # - password is the str to pad
    # - size is the int number of characters in the padded
    #string that is returned
    #compute random split index
    fill = '!@#$%^&*()-+=~[]{}'
    embedding = ''
    password_size = len(password)
    split_index = randint(0, size - password_size)
    for index in range(0, split_index):
        embedding = embedding + choice(fill)
    embedding = embedding + password
    for index in range(split_index + password_size, size):
        embedding = embedding + choice(fill)
    return embedding

def display_hint(window, password, guess, location):
    string = guess + ' INCORRECT'
    display_line(window, string, location)
    correct = 0
    index = 0
    for letter in guess:
        if index < len(password) and letter == password[index]:
            correct = correct + 1
        index = index + 1
    correct = str(correct)
    string = correct + '/7 IN MATCHING POSITIONS'
    display_line(window, string, location)
    
main()

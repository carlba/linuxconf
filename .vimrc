call pathogen#infect()
set nocompatible
source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
source ~/.simplenoterc
behave mswin

set diffexpr=MyDiff()
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let eq = ''
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      let cmd = '""' . $VIMRUNTIME . '\diff"'
      let eq = '"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3 . eq
endfunction


" My Stuff

" Set vim to 256 colormode
" Taken from http://vim.wikia.com/wiki/256_colors_in_vim
set t_Co=256

colorscheme zenburn

if has("gui_running")
  if has("gui_gtk2")
    set guifont=Inconsolata\ 12
  elseif has("gui_win32")
    set guifont=Consolas:h8:cANSI    
  set guioptions-=T  "remove toolbar    
  endif
endif

set tabstop=4
set shiftwidth=4
set expandtab

filetype plugin indent on

:set nu

set grepprg=grep

"Set Startup size of Vim
"set lines=50 
"set columns=120

"Fix so that mouse and key selection does a visual select instead of a replace
"selet. This has the effect that it is possible to use commands such as indent (>) eventhough behavewin is active:
set selectmode=

set statusline=%F%m%r%h%w\ format=%{&ff}\ \|\ type=%Y\ \|\ ascii=\%03.3b\ \|\ \(%04l,\ %04v\)\ \|\ lines=%L
set laststatus=2

map <F1> :set fdm=expr<CR>:set fde=getline(v:lnum)=~'^\\s*#'?1:getline(prevnonblank(v:lnum))=~'^\\s*#'?1:getline(nextnonblank(v:lnum))=~'^\\s*#'?1:0<CR><CR>

set wildmenu

:amenu &Calle.&Fold\ Apache-config<Tab><F1> <F1><CR>

"Toggle tagbar by default
au VimEnter * TagbarOpen

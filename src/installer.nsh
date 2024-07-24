!include "LogicLib.nsh"
!include "MUI2.nsh"

; デフォルトのインストールパス
InstallDir "$PROGRAMFILES\MineServerImager"

; インストール先フォルダ選択ダイアログを表示
Page Directory
Page InstFiles

Section "MainSection" SEC01
  ; インストール先ディレクトリを設定
  SetOutPath "$INSTDIR"

  ; servers フォルダを作成
  CreateDirectory "$INSTDIR\servers"

  ; 他のファイルコピー処理など
SectionEnd

# InterviewTask React app with PHP backend #
### Nezveřejnujte zadání, nevytvářejte public forky! ###
___

## Projekt - Git:
- Github - Fork projektu na svuj github
- Tento Váš forknutý repozitář nastavte jako private
- vytvořte si novou branch do které budete zpracovávat zadání (název větve necháme na Vás)
- po dokončení zadání vytvořte Pull Request do masteru/mainu
- V Pull Requestu napsat co bylo změněno
- Vytvořit/dopsat README.md s popisem jak to spustit (pokud jste nevyužili tuto šablonu)
- poslat link s přístupem na repo nebo přidat naše emaily jako collaboratora:
  - apudil@acmark.com
  - okeprt@acmark.com
  - jkovar@acmark.com

## Frontend:
- Dvě možnosti vstupu, jedna pro zadání IČO, druhá pro zadání názvu firmy (např. dva taby...)
- možnost do inputů zadat více IČO/Jmen Firem, oddělených středníkem [;] (získají se data pro všechny zadané IČA/Jména)
- zobrazit seznam firem vrácené z BE
- v seznamu zobrazit:
    - ICO
    - Název
    - Adresu
    - Datum zápisu
    - Právní forma (pravnicka / fyzicka osoba)
    - <em>[optional] NACE s překladem</em>
- udělat další input a implementovat vyhledávání (filtrování) v zobrazeném seznamu firem
- nastylovat uživatelsky přívětivě dle svých preferencí
- <em>[optional] použití NPM knihoven zejména MUI5 ale můžete i jiné (které se Vám budou hodit)</em>
- <em>[optional] export seznamu firem do csv</em>

## Backend:
- zpracovat requesty z FE
- zavolat na ARES (Státní registr ekonomických subjektů https://ares.gov.cz/) pro získání dat o firmách
- zpracovat odpověď z ARES
- poslat zpracovaná data na FE která se zobrazí
- Využívat OOP
- Doporučujeme použít knihovnu Guzzle pro HTTP requesty
- <em>[optional] Využít knihoven (composer)</em>

<br/>

Oceníme vaše vlastní nápady a rozšíření řešení, které by mohly být zajímavé a užitečné. Další plus by byly testy.

<br/>

Pro Váš vývoj je předchystaná šablona s dockerem, která obsahuje PHP a React.
Doporučujeme ji použít, ale můžete si vytvořit vlastní projekt a strukturu.

# Použití Docker šablony #

### Prerequisites:
- installed npm
- installed docker

### 1) init files for docker:
- ```sh docker_init.sh```

### 2) setup .env -> see .env 
- [Linux] fill in your user UID/GID to WWW_UID/WWW_GID ... for permissions

### 3) setup rest:
  - ```docker compose build && docker compose up -d```
  - ```cd frontend```
  - ```npm install```
  - ```npm run dev```

### 4) testing:
  - localhost:5150 -> you should see `"Hello World!"`
  - localhost:8085 -> you should see default react app

___
&copy; 2025 Acmark s.r.o. 

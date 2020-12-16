<?php

include "includes/Helper.php";
$H = new Helper();

function sourcePath($source = "")
{
    return "" . $source;
}

function lnk($page = "homepage")
{
    return "index.php?path=" . $page;
}


?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>Tonka</title>
    <meta name="description" content="Tonka">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <!-- <link rel="icon" href="images/favicon.png"> -->
    <!-- <meta property="og:image" content="images/dest/preview.jpg"> -->
    <link rel="stylesheet" href="<?= sourcePath() ?>css/app.min.css">
</head>
<body>

    <div class="page <?=$H->pageClassName()?>">


        <header class="header">
            <div class="container">

                <div class="header__all-product-background">
                    <div class="all-product-close"></div>
                </div>

                <!-- header__top-line -->
                <div class="header__top-line">

                    <div class="header__left-side">
                        <a href="<?=lnk()?>" class="logo"></a>
                    </div>

                    <div class="header__right-side">
                        <nav class="header-nav">
                            <a href="<?=lnk('list')?>" class="header-nav__item">Продукция</a>
                            <a href="<?=lnk('world')?>" class="header-nav__item">Мир tonka</a>
                            <a href="<?=lnk('company')?>" class="header-nav__item">для компаний</a>
                        </nav>

                        <!-- user-->
                        <a href="#" class="user"></a>

                        <!-- basket -->
                        <a href="#" class="basket">
                            <span class="basket__item">1</span>
                        </a>

                        <span class="order-price">12600 руб.</span>
                    </div> <!-- /header__right-side -->

                </div> <!-- /header__top-line -->

                <a href="/" class="logo-mobile"></a>

                <!-- header__bottom-line -->
                <div class="header__bottom-line">
                    <div class="bottom-line__button">индивидуальный дизайн tonka altai</div>
                    <div class="bottom-line__text">Парфюмер Van Vasnier, создатель ароматов для Tom Ford, Jo Malone, Marc Jacobs</div>
                    <span id="allProduct" class="header-button">вся продукция</span>
                </div>

                <div class="header-world">
                    <div class="header-world-title">
                        <span class="header-world-title__item item_t"></span>
                        <span class="header-world-title__item item_o"></span>
                        <span class="header-world-title__item item_n"></span>
                        <span class="header-world-title__item item_k"></span>
                        <span class="header-world-title__item item_a"></span>
                    </div>

                    <div class="header-world-inner">
                        <div class="header-world__left-side"></div>
                        <div class="header-world__right-side">
                            
                        </div>
                    </div>
                </div>


                <div class="header-delivery">
                    <div class="header-delivery-title">
                        <span class="header-delivery-title__item item_t"></span>
                        <span class="header-delivery-title__item item_o"></span>
                        <span class="header-delivery-title__item item_n"></span>
                        <span class="header-delivery-title__item item_k"></span>
                        <span class="header-delivery-title__item item_a"></span>
                    </div>

                    <div class="header-delivery-inner">
                        <div class="header-delivery__left-side"></div>
                        <div class="header-delivery__right-side">
                            
                        </div>
                    </div>
                </div>

                 <div class="header-bonus">
                    <div class="header-bonus-title">
                        <span class="header-bonus-title__item item_t"></span>
                        <span class="header-bonus-title__item item_o"></span>
                        <span class="header-bonus-title__item item_n"></span>
                        <span class="header-bonus-title__item item_k"></span>
                        <span class="header-bonus-title__item item_a"></span>
                    </div>

                    <div class="header-bonus-inner">
                        <div class="header-bonus__left-side"></div>
                        <div class="header-bonus__right-side">
                            
                        </div>
                    </div>
                </div>

                <div class="header-company">
                    <div class="header-company-title">
                        <span class="header-company-title__item item_t"></span>
                        <span class="header-company-title__item item_o"></span>
                        <span class="header-company-title__item item_n"></span>
                        <span class="header-company-title__item item_k"></span>
                        <span class="header-company-title__item item_a"></span>
                    </div>

                    <a href="#" class="header-company-button">
                        <span class="header-company-button__text">выбрать набор</span>
                    </a>

                    <div class="header-company-inner">
                        <div class="header-company__left-side"></div>
                        <div class="header-company__right-side">
                            
                        </div>
                    </div>
                </div>

            </div>

            <!-- login -->
            <div class="login">
                <div class="login-inner">
                    <div class="login-close"></div>

                    <a href="/" class="logo login-logo"></a>

                    <div class="login-header">Бонусная программа</div>
                    <form action="" id="loginForm" class="login-form">
                        <input class="login-form__item _req _email" type="text" name="email" value="E-mail" autocomplete="off">
                        <input class="login-form__item _req _password" type="text" name="password" value="Пароль" autocomplete="off">
                        <button class="login-form__button" type="submit">вход</button>
                    </form>

                    <div class="login-links">
                        <a href="#" class="login-links__item">Регистрация</a>
                        <a href="#" class="login-links__item">Забыли пароль?</a>
                    </div>
                </div>
            </div>

        </header> <!-- header -->

        <main class="main">
            <?
                $H->tmpl(); // Выводит файл
            ?>
        </main>

        <footer class="footer">
            <div class="container">
                <div class="footer__top-line">
                    <div class="footer-nav">
                        <a href="<?=lnk('list')?>" class="footer-nav__item">продукция</a>
                        <a href="<?=lnk('world')?>" class="footer-nav__item">мир tonka</a>
                        <a href="<?=lnk('company')?>" class="footer-nav__item">для компаний</a>
                        <a href="<?=lnk('delivery')?>" class="footer-nav__item">доставка</a>
                        <a href="<?=lnk('bonus')?>" class="footer-nav__item">бонусная программа</a>
                    </div>
                    <div class="footer-social">
                        <a href="#" class="footer-social__item footer-social__item--phone"></a>
                        <a href="#" class="footer-social__item footer-social__item--insta"></a>
                        <a href="#" class="footer-social__item footer-social__item--fb"></a>
                    </div>
                </div>
                <div class="footer-contacts">
                    <span class="footer-contacts__item">Москва, Б. Патриарший пер 12, стр. 2</span>
                    <span class="footer-contacts__item">+7 985 766 12 89</span>
                    <span class="footer-contacts__item">info@tonkaperfumes.ru</span>
                </div>
                <div class="footer-copyright">
                    © Tonka Perfumes Moscow 2020
                </div>
            </div>
        </footer>
    </div>

    <script src="js/app.min.js"></script>
</body>
</html>

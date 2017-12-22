var api = "https://pt.wikipedia.org/w/api.php";

$(document).ready(function () {

    // Pesquisa quando a tecla enter é acionada
    $("#key").keyup( function (e) {
        if (e.keyCode == 13) { 
            var valor = $("#key").val();
            $(".box-pesquisar").css("padding-top", "10px");
            $(".row").html("");
            $(".box-load").html('<div class="load"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></div>');

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: api,
                data: {
                    action: "query",
                    list: "search",
                    srsearch: valor,
                    format: "json",
                    srlimit: "12"
                },
                success: function (result) {
                    $("input[type=text], textarea").val("");
                    $(".load").remove();

                    var content = result.query.search;

                    if (result.query.searchinfo.totalhits === 0) {

                        $(".row").append("<div class=\"erro\"><h1>Ooops! Nada encontrado.</h1></div>");
                     
                    } else {    
                        for (var i = 0; i < 12; i++) {
                            var artigoUrl = "https://pt.wikipedia.org/?curid=" + content[i].pageid;
                            var artigoTitulo = content[i].title;
                            var artigoDescricao = content[i].snippet;
                            $(".row").append(
            
                                "<div class=\"artigo col-md-12\">" +
                                    "<div class=\"titulo\"><a href=\"" + artigoUrl + "\" target=\"_blank\">"+artigoTitulo+"</a></div>" +
                                    "<div class=\"descricao\">"+ artigoDescricao +"</div>" +
                                "</div>"
            
                            );
                        }
                    }    
                }   
            }) // AJAX REQUEST

        } // end if
        
    }) // keyup event

});
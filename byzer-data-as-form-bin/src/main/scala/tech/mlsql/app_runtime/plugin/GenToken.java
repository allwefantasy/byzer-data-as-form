package tech.mlsql.app_runtime.plugin;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.Base64Codec;

import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * 7/6/2022 WilliamZhu(allwefantasy@gmail.com)
 */
public class GenToken {

    public static void main(String[] args) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setIssuedAt(new Date())
                .claim("name", "admin")
                //签名手段，参数1：算法，参数2：盐
                .signWith(SignatureAlgorithm.HS256, args[0]);
        String token = jwtBuilder.compact();
        System.out.println("token generated:\n " + token);
    }

}

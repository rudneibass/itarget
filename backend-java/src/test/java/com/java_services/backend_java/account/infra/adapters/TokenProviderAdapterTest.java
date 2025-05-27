package com.java_services.backend_java.account.infra.adapters;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Field;

class TokenProviderAdapterTest {

    private TokenProviderAdapter tokenProvider;

    private final String secret = "6cda17c46a94e4b98c76b36ec1154c9c2b0b9d0da99b1479220903e4f6c17ca24830ea1e4c5effab5a3ca35454d309d7c68e782f19408c8826d099bff2c85adbd20bf0dceb28b78250473ac7751bb1adae8a3750ddf24dccfeaee246d1d8d19ea425b5bde121f7f97ba58d5e549d71d331664624405d8c553c151a09ad0604458b771ea8fbf3bdadfe75d6188bc670ef506939263ce4517119bb998d420d5a2d294d4921aae76b40b20b57bdb704c6786d30897a2650bee46dd62c49e7e39930814aafccc5fad4700a1b2cd823a103fe595325cfdd8d7eafd39db80d69aa24b5aeafef0be6a468ba3c6dc27a91ebebc869d881b565bf6c476799f86089e11f7e94d3c0a9a6a22e0e17de8ec99bda97d3e785405335eb47d4affa7cb0c9fda83ccca39a8298d0559ea61f0d7c8fbfe8c0cf51e55183a0965cd77d8338e43eefa435a7084e21563bed0a84703492f84524167cbcef2a1777fa87508827632aa5f0dd50819a9ad6c259c44e49b270877d2bf675d8d9247ee0f45f3819ec094f9ffa0794f96056dbe64e82f9227af20479c1c46c0910991ad7c993ae7327005261854406ca7f92f2b8c85a77c2fb96dca69d8613173d898708efbb7986d8dad345cbf221cccd704d2572c17dc15705d911dc8ec0f75cad1e960bab8ea7cef660296f607d3fd548195750cdcc0381914b78a13ca0b446a3f84ca052f3920378d73e32";
    private final long expirationInMs = 1000 * 60 * 60;
    @BeforeEach
    void setUp() throws Exception {
        tokenProvider = new TokenProviderAdapter();

        Field secretField = TokenProviderAdapter.class.getDeclaredField("secret");
        secretField.setAccessible(true);
        secretField.set(tokenProvider, secret);

        Field expirationField = TokenProviderAdapter.class.getDeclaredField("expirationInMs");
        expirationField.setAccessible(true);
        expirationField.set(tokenProvider, expirationInMs);
    }

    @Test
    void shouldGenerateValidToken() {
        String subject = "testUser";
        String token = tokenProvider.generateToken(subject);
        assertNotNull(token);
        assertTrue(tokenProvider.validateToken(token));
        assertEquals(subject, tokenProvider.extractSubject(token));
    }

    @Test
    void shouldInvalidateTamperedToken() {
        String subject = "testUser";
        String token = tokenProvider.generateToken(subject);
        String tamperedToken = token + "tamper";
        assertFalse(tokenProvider.validateToken(tamperedToken));
    }

    @Test
    void shouldExtractCorrectSubject() {
        String subject = "subject@example.com";
        String token = tokenProvider.generateToken(subject);
        String extracted = tokenProvider.extractSubject(token);
        assertEquals(subject, extracted);
    }
}

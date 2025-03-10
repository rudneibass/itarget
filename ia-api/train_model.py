import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

# Criando dados fictícios para treino (exemplo com duas classes)
np.random.seed(42)
X = np.random.rand(500, 3) * 10  # 500 amostras com 3 características cada
y = (X[:, 0] + X[:, 1] > 10).astype(int)  # Classificação binária

# Divisão em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalizando os dados
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Salvando o scaler para uso na API
joblib.dump(scaler, "scaler.pkl")

# Criando um modelo de rede neural simples
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Saída binária
])

# Compilando o modelo
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Treinando o modelo
model.fit(X_train, y_train, epochs=50, batch_size=10, validation_data=(X_test, y_test))

# Salvando o modelo treinado
model.save("meu_modelo.h5")

print("Modelo treinado e salvo com sucesso!")

# apps 디렉토리

이 디렉토리는 reward-system 프로젝트의 주요 애플리케이션들을 포함하고 있습니다. 각 하위 폴더는 독립적인 서비스 또는 모듈로 구성되어 있습니다.

## 디렉토리 구조

- `auth/`  
  인증 및 인가와 관련된 서비스가 위치합니다. 회원가입, 로그인, 토큰 발급, 권한 관리 등의 기능을 담당합니다.

- `event/`  
  이벤트와 관련된 비즈니스 로직을 처리합니다. 이벤트 생성, 조회, 관리 등 이벤트 기반의 기능이 구현되어 있습니다.

- `gateway/`  
  API Gateway 역할을 수행합니다. 외부 요청을 받아 내부 서비스로 라우팅하며, 인증, 로깅, 요청 검증 등의 공통 기능을 제공합니다.

## 기술 스택

- Backend: NestJS
- 데이터베이스: MongoDB
- 컨테이너화: Docker, Docker Compose

## 사용 방법

각 앱 디렉토리 내부의 README 또는 문서를 참고하여 개별적으로 실행하거나 개발할 수 있습니다.

## 실행 방법

1. 터미널을 엽니다.
2. 이 저장소를 clone 합니다: `git clone [저장소 URL]`
3. `cd reward-system/` 을 입력하여 이동합니다.
4. `docker compose up -d` 명령어를 터미널에 입력합니다.
5. Gateway port는 3001번입니다.
6. 내부 ip를 확인합니다. [내부 ip 확인 방법](https://itmoneytree.tistory.com/entry/%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EB%82%B4-%EC%BB%B4%ED%93%A8%ED%84%B0-IP-%ED%99%95%EC%9D%B8-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95windowmac)
7. http://{내부-ip}:3001/api 를 입력하시면 Swagger UI를 확인할 수 있습니다.

## 관리자 계정

- 이메일: "admin@example.com"
- 비밀번호: "1234"
